# API
import os
import json
import logging
import requests
import pymongo
import json
import flask
import html
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status
from twilio.rest import Client
from twilio import twiml
from bs4 import BeautifulSoup
from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify
import time
load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
uri = os.getenv("URI_MONGODB")

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

def get_answer_from_mongo(intent, nid):
    client = pymongo.MongoClient(uri)    
    db = client.get_database()    
    reporte = db['Intents/NIDs']  
    total_reporte = ""
    if intent == "":
        total_reporte = reporte.find({"nid": nid}) 
    elif nid == "":
        total_reporte = reporte.find({"intent": intent}) 
    else:
        total_reporte = reporte.find({"nid": intent, "nid": nid}) 

    response=[]
    for i in total_reporte:
        i['_id'] = str(i['_id'])
        response.append(i)
    return response

def send_message_twilio(message: str, img_url: str = None):
    # Your Account Sid and Auth Token from twilio.com/console
    # DANGER! This is insecure. See http://twil.io/secure
    account_sid = 'AC9d43996b41fcb2a38351cf74796d3b52'
    auth_token = os.getenv('auth_token_twilio')
    client = Client(account_sid, auth_token)
    
    if not img_url:
        message = client.messages.create(
            body=message,
            from_='whatsapp:+14155238886',
            to='whatsapp:+5215530325689',
        )
    else:
        message = client.messages.create(
            media_url=[img_url],
            body=message,
            from_='whatsapp:+14155238886',
            to='whatsapp:+5215530325689',
        )

def html_to_text(message):
    soup = BeautifulSoup(message, "html.parser")
    return soup.get_text()

def messages_to_whats_app(message: dict):
    watson_intent = message.get("intent", None)
    watson_nid = message.get("nid", None)
    
    if watson_intent == "General_Greetings":
        response_to_whats_app = html_to_text(message.get("response", None))
        send_message_twilio(response_to_whats_app + "\n" + " \n ¿En que puedo ayudarte?", "https://i.ibb.co/k4DTyXs/CDMX.jpg")
        time.sleep(1)
        send_message_twilio("💡*Temas Relacionados* \n" + "Para más información *escribe el número* de la opción que deseas consultar. 👇\n \n"+ "1) Hacer un reporte \n" + "2) Nuestras Oficinas \n" + "3) Realizar Pago" )
    elif watson_intent == "ReportarFuga":
        message_reporte = message.get("response", None)
        for i in message_reporte:
            response_to_whats_app = html_to_text(message_reporte[i])
            send_message_twilio(response_to_whats_app)
    elif watson_nid == "reporte-realizado":
        message_reporte = message.get("response", None)
        for i in message_reporte:
            response_to_whats_app = html_to_text(message_reporte[i])
            send_message_twilio(response_to_whats_app)
    elif watson_intent == "small_talk_duda_generica":
        message_reporte = message.get("response", None)
        for i in message_reporte:
            response_to_whats_app = html_to_text(message_reporte[i])
            send_message_twilio(response_to_whats_app)
        send_message_twilio("💡*Temas Relacionados* \n" + "Para más información *escribe el número* de la opción que deseas consultar. 👇\n \n"+ "1) Hacer un reporte \n" + "2) Nuestras Oficinas \n" + "3) Realizar Pago" )
    elif watson_nid == "pago" and watson_intent == "pago":
        message_reporte = message.get("response", None)
        for i in message_reporte:
            response_to_whats_app = html_to_text(message_reporte[i])
            send_message_twilio(response_to_whats_app)
    elif watson_intent == "Oficina":
        response_to_whats_app = html_to_text(message.get("response", None))
        send_message_twilio(response_to_whats_app)
        send_message_twilio("💡*Temas Relacionados* \n" + "Para más información *escribe el número* de la opción que deseas consultar. 👇\n \n" + "0) Volver al menú inicial \n" + "4) Sobre nosotros")
    elif watson_nid == "anyelse-info":
        response_to_whats_app = html_to_text(message.get("response", None))
        send_message_twilio(response_to_whats_app)
        send_message_twilio("💡*Temas Relacionados* \n" + "Para más información *escribe el número* de la opción que deseas consultar. 👇\n \n"+ "0) Volver al menú inicial \n" + "5) Nuestro coordinador" )
    elif watson_nid == "secretario": 
        response_to_whats_app = html_to_text(message.get("response", None))
        send_message_twilio(response_to_whats_app, "https://i.ibb.co/yR1gsSP/rcarmonap.jpg")
    else:
        response_to_whats_app = html_to_text(message.get("response", None))
        send_message_twilio(response_to_whats_app)

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
            response_mongo = get_answer_from_mongo("", watson_nid)
        elif watson_intent:
            response_mongo = get_answer_from_mongo(watson_intent, "")
        else:
            response_mongo = get_answer_from_mongo(watson_intent, watson_nid)
        
        if watson_nid == "ReporteFuga/Capacidad/Calles" or watson_nid == "ReporteFuga/Capacidad/Calles/Descripción" or watson_nid == "reporte-realizado" or watson_nid == "comentario-neutro-si":
           response_mongo = get_answer_from_mongo("", watson_nid)

        if watson_nid == "secretario" and watson_intent == "acerca-de":
            response_mongo = get_answer_from_mongo("", watson_nid)

        if watson_nid == "comentarios_neutros" and watson_nid=="comentario-neutro-si":
            response_mongo = get_answer_from_mongo("", watson_nid)

        response_to_user=""

        for i in response_mongo:
            response_to_user = i

        intent = response_to_user.get("intent", "")
        nid = response_to_user.get("nid", "")
        response1 = response_to_user.get("response", "")
        name = response_to_user.get("watson_context_nombre", "")

        #COMENTAR PARA EVITAR UN MONSTRUO EN MONGO, SOLO CUANDO ESTEMOS EN PRODUCCION DESCOMENTAR
        #Send intent, nid and message to mongo
        #insert_report(intent, nid, message)

        if message == "RESET":
            os.environ['session_id'] = watson_create_session()
        #Cerrar sesión si el usuario termina la conversación
        if watson_answer.get("watson_answer") == "<p>Gracias, vuelve pronto 🙌.</p>":
            #os.environ['session_id'] = watson_create_session()
            os.environ['session_id'] = ""
        
        response = {
            "intent": intent,
            "nid": nid,
            "response": response1,
            "name": name
        }
        return response

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

#ENDPOINT FOR WHATS APP
class GET_MESSAGE_WHATSAPP(Resource):

    def post(self):
        print("RECIBI MENSAJE")
        if os.getenv('session_id') == "":
            os.environ['session_id'] = watson_create_session()
        
        #Receive message from Twilio
        message = request.form['Body']

        if message == "1)" or message == "1":
             watson_answer = watson_response("Hacer un reporte")
        elif message == "2)" or message == "2":
            watson_answer = watson_response("Nuestras Oficinas")
        elif message == "3)" or message == "3":
            watson_answer = watson_response("Realizar Pago")
        elif message == "4)" or message == "4":
            watson_answer = watson_response("Sobre nosotros")
        elif message == "5)" or message == "5":
            watson_answer = watson_response("Nuestro coordinador")
        elif message == "0)" or message == "0":
            watson_answer = watson_response("Info")
        else:
            watson_answer = watson_response(message)
        #watson_answer = watson_response(message)
        
        #### MongoDB
        watson_intent = watson_answer.get("watson_intent", "")
        watson_nid = watson_answer.get("watson_nid", "")
        response_mongo =  ""
        
        if not watson_intent:
            response_mongo = get_answer_from_mongo("", watson_nid)
        elif watson_intent:
            response_mongo = get_answer_from_mongo(watson_intent, "")
        else:
            response_mongo = get_answer_from_mongo(watson_intent, watson_nid)
        
        if watson_nid == "ReporteFuga/Capacidad/Calles" or watson_nid == "ReporteFuga/Capacidad/Calles/Descripción" or watson_nid == "reporte-realizado" or watson_nid == "comentario-neutro-si":
           response_mongo = get_answer_from_mongo("", watson_nid)

        if watson_nid == "secretario" and watson_intent == "acerca-de":
            response_mongo = get_answer_from_mongo("", watson_nid)

        if watson_nid == "comentarios_neutros" and watson_nid=="comentario-neutro-si":
            response_mongo = get_answer_from_mongo("", watson_nid)

        response_to_user=""

        for i in response_mongo:
            response_to_user = i

        intent = response_to_user.get("intent", None)
        nid = response_to_user.get("nid", None)
        response1 = response_to_user.get("response", None)
        name = response_to_user.get("watson_context_nombre", None)

        response = {
            "intent": intent,
            "nid": nid,
            "response": response1,
        }

        messages_to_whats_app(response)
        
api.add_resource(GET_MESSAGE_WHATSAPP, '/getMessageWhatsApp')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
