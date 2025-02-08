FROM python:3.12-slim

# Prevents Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh

# Persistent SQLite volume mount point
VOLUME ["/app/db"]

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]
