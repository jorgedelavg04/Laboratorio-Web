FROM python:3

RUN pip install --upgrade pip 

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt

CMD ["python", "api.py"]
#EXPOSE 8080
#ENTRYPOINT [ "/app/bootstrap.sh" ]