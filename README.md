Site metrics exporter for Prometheus
====================================

Exports site metrics using PhantomAS into Prometheus scraper format.

```
$ docker build .
$ docker run -p 9149:9149 
$ curl -s 'http://localhost:9149/?url=https://torchbox.com/'
requests 50
gzip_requests 11
post_requests 1
https_requests 50
not_found 0
body_size 378885
content_length 4745796
http_traffic_completed 3311
time_to_first_byte 536
time_to_last_byte 562
...
```

Example config in prometheus.yml:

```
  - job_name: 'sitemetrics_exporter_google_de'

    scrape_interval: 20s
    metrics_path: "/"
    params:
      'url': ['http://google.de']
    static_configs:
      - targets: ['192.168.15.5:9149']
```
