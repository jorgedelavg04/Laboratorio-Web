# API
import os
import json
import logging
import requests

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def watson_create_session():

    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)

    try:
        watson_session = assistant.create_session(
            assistant_id=os.getenv("assistant_id")
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE
    return watson_session_id

def watson_response(message: str):
    
    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = ""
    watson_answer = ""
    watson_session_id = os.getenv('session_id')

    try:
        watson_response = assistant.message(
            assistant_id=os.getenv('assistant_id'),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            }
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=os.getenv("assistant_id")
            ).get_result()
            watson_session_id = os.getenv('session_id')
            watson_response = assistant.message(
                assistant_id=os.getenv('assistant_id'),
                session_id=os.getenv('session_id'),
                input={
                    'message_type': 'text',
                    'text': message,
                    'options': {
                        'return_context': True
                    }
                },
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass

    response = {
        "response": watson_response,
        "session_id": watson_session_id
    }
    watson_context_variable = response.get("response", {}).get("context", {}).get("skills", {}).get("main skill", {}).get("user_defined", {})
    print(watson_context_variable)
    watson_answer = response.get("response", {}).get("output", {}).get("generic", [])[0].get("text", "")
    watson_intent_array = response.get("response", {}).get("output", {}).get("intents", [])
    watson_intent = ""
    watson_context_nombre = ""
    for intent in watson_intent_array:
        if not intent.get("intent"):
            watson_intent = "Default"
        else:
            watson_intent = intent.get("intent")

    for key, value in watson_context_variable.items():
          if key == 'nombre':
              watson_context_nombre = value

    final_response = {
        "watson_answer": watson_answer,
        "watson_intent": watson_intent,
        "watson_context_nombre": watson_context_nombre
    }
    return final_response

def watson_instance(iam_apikey: str, url: str, version: str = "2020-04-01") -> AssistantV2:
    try:
        authenticator = IAMAuthenticator(iam_apikey)
        assistant = AssistantV2(
            authenticator=authenticator,
            version=version
        )
        assistant.set_service_url(url)
    except ApiException as error:
        _logger.error("%s - %s", error.code, error.message)
        return jsonify({'error': str(error.message)}), error.code

    return assistant

class GET_MESSAGE(Resource):
    
    #if os.getenv('session_id') == "":
    #    os.environ['session_id'] = watson_create_session()

    def post(self):
        if os.getenv('session_id') == "":
            os.environ['session_id'] = watson_create_session()
        print(os.getenv("session_id"))
        message = request.json["message"]
        watson_answer = watson_response(message)
        if message == "RESET":
            os.environ['session_id'] = watson_create_session()
        #Cerrar sesión si el usuario termina la conversación
        if watson_answer.get("watson_answer") == "<p>Gracias, vuelve pronto 🙌.</p>":
            #os.environ['session_id'] = watson_create_session()
            os.environ['session_id'] = ""
        
        return jsonify( response_watson = watson_answer)

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
