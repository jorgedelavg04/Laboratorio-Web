# API
import os
import json
import logging
import requests
import pymongo

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
uri = "mongodb+srv://fugasagua:fugasagua@cluster0.3ckgw.gcp.mongodb.net/Reporte?retryWrites=true&w=majority"

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
    watson_answer_array= response.get("response", {}).get("output", {}).get("generic", [])    
    watson_answer_entity= response.get("response", {})
    
    watson_intent_array = response.get("response", {}).get("output", {}).get("intents", [])
    watson_context_variable = response.get("response", {}).get("context", {}).get("skills", {}).get("main skill", {}).get("user_defined", {})
    watson_intent = ""
    watson_context_nombre = ""
    watson_answer = []
    watson_nid = ""

    for i in watson_answer_array:
        watson_answer.append(i.get("text"))
        
    if watson_answer == []:
        watson_answer.append("<p>Ups...🙃 No entendí tu pregunta. Por favor preguntame de nuevo.</p>")    
        watson_intent = "anything_else"
        watson_nid = "anything_else"
         

    for intent in watson_intent_array:
        if not intent.get("intent"):
            watson_intent = "anything_else"
        else:
            watson_intent = intent.get("intent")

    for key, value in watson_context_variable.items():
        if key == 'nombre':
            watson_context_nombre = value 
        if key == 'nid':
            watson_nid = value
        

    #insert_report(watson_intent, watson_answer)
    final_response = {
        "watson_answer": watson_answer,
        "watson_intent": watson_intent,
        "watson_context_nombre": "",
        "watson_nid": watson_nid
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

def insert_report(intent, nid, message):    
	
    client = pymongo.MongoClient(uri)    
    db = client.get_database()    
    reporte = db['Conversaciones']   
    conversation = [{'intent': intent, 'nid': nid, "user_message": message}] 
    reporte.insert_many(conversation)    	

def get_answer(intent):
    client = pymongo.MongoClient(uri)    
    db = client.get_database()    
    reporte = db['Intents/NIDs']  
    total_reporte = reporte.find({"intent": intent }) 
    response=[]
    for i in total_reporte:
        i['_id'] = str(i['_id'])
        response.append(i)
    print("response1")
    print(response)
    return response

def get_answer2(intent):
    client = pymongo.MongoClient(uri)    
    db = client.get_database()    
    reporte = db['Intents/NIDs']  
    total_reporte = reporte.find({"nid": intent }) 
    response=[]
    for i in total_reporte:
        i['_id'] = str(i['_id'])
        response.append(i)
    return response

def get_answer3(intent, nid):
    client = pymongo.MongoClient(uri)    
    db = client.get_database()    
    reporte = db['Intents/NIDs']  
    total_reporte = reporte.find({"nid": intent, "nid": nid}) 
    response=[]
    for i in total_reporte:
        i['_id'] = str(i['_id'])
        response.append(i)
    return response
    
	
class GET_MESSAGE(Resource):
    
    #if os.getenv('session_id') == "":
    #   os.environ['session_id'] = watson_create_session()

    def post(self):
        if os.getenv('session_id') == "":
            os.environ['session_id'] = watson_create_session()
        message = request.json["message"]
        watson_answer = watson_response(message)
        
        
        #### MongoDB
        watson_intent = watson_answer.get("watson_intent", "")
        watson_nid = watson_answer.get("watson_nid", "")
        response_mongo =  ""
        
        if not watson_intent:
            response_mongo = get_answer2(watson_nid)

        elif watson_intent:
            response_mongo = get_answer(watson_intent)
        else:
            response_mongo = get_answer3(watson_intent, watson_nid)
        
        if watson_nid == "ReporteFuga/Capacidad/Calles" or watson_nid == "ReporteFuga/Capacidad/Calles/Descripción" or watson_nid == "reporte-realizado" or watson_nid == "comentario-neutro-si":
           response_mongo = get_answer2(watson_nid)

        if watson_nid == "secretario" and watson_intent == "acerca-de":
            response_mongo = get_answer2(watson_nid)

        if watson_nid == "comentarios_neutros" and watson_nid=="comentario-neutro-si":
            response_mongo = get_anwswer2(watson_nid)

        response_to_user=""

        for i in response_mongo:
            response_to_user = i

        intent = response_to_user.get("intent", "")
        nid = response_to_user.get("nid", "")
        response1 = response_to_user.get("response", "")
        name = response_to_user.get("watson_context_nombre", "")

        #Send intent, nid and message to mongo
        insert_report(intent, nid, message)
        
        response = {
            "intent": intent,
            "nid": nid,
            "response": response1,
            "name": name
        }

        if message == "RESET":
            os.environ['session_id'] = watson_create_session()
        #Cerrar sesión si el usuario termina la conversación
        if watson_answer.get("watson_answer") == "<p>Gracias, vuelve pronto 🙌.</p>":
            #os.environ['session_id'] = watson_create_session()
            insert_report(watson_answer.get("watson_intent"), watson_answer.get("watson_answer"), message, "false")
            os.environ['session_id'] = ""

        return response

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
