docker stop sitemetrics
docker rm sitemetrics
docker build -t sitemetrics_exporter .
docker run -p 9149:9149 --name sitemetrics -d --init sitemetrics_exporter
