#!/bin/bash
# AETHER React Dashboard - Start/Stop Script

PORT=8081
DIST_DIR="/root/aether-dashboard/dist"
PID_FILE="/tmp/aether-react.pid"
LOG_FILE="/tmp/aether-react-8081.log"

case "$1" in
  start)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "Dashboard já está rodando (PID: $PID)"
        exit 0
      else
        rm -f "$PID_FILE"
      fi
    fi

    echo "Iniciando AETHER React Dashboard na porta $PORT..."
    cd "$DIST_DIR"
    nohup python3 -m http.server $PORT > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    sleep 2
    if ps -p $(cat "$PID_FILE") > /dev/null 2>&1; then
      echo "✓ Dashboard iniciado com sucesso (PID: $(cat "$PID_FILE"))"
      echo "✓ Acesse: http://localhost:$PORT"
      echo "✓ Backend Python: http://localhost:3000"
    else
      echo "✗ Erro ao iniciar dashboard"
      rm -f "$PID_FILE"
      exit 1
    fi
    ;;

  stop)
    if [ ! -f "$PID_FILE" ]; then
      echo "Dashboard não está rodando (sem PID file)"
      exit 0
    fi

    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "Parando dashboard (PID: $PID)..."
      kill "$PID"
      sleep 1
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "Forçando parada..."
        kill -9 "$PID"
      fi
      rm -f "$PID_FILE"
      echo "✓ Dashboard parado"
    else
      echo "Dashboard não estava rodando"
      rm -f "$PID_FILE"
    fi
    ;;

  restart)
    $0 stop
    sleep 1
    $0 start
    ;;

  status)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "✓ Dashboard rodando (PID: $PID)"
        echo "  URL: http://localhost:$PORT"
        echo "  Log: $LOG_FILE"
        exit 0
      fi
    fi
    echo "✗ Dashboard não está rodando"
    exit 1
    ;;

  *)
    echo "Uso: $0 {start|stop|restart|status}"
    exit 1
    ;;
esac
