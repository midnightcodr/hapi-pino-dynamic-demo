[ $# -lt 2 ] && echo "$0 pid level" && exit 0
echo -n $2 > /tmp/loglevel.$1
kill -USR1 $1
