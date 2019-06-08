# grpc-vs-rest
Benchmark grpc vs rest

## Context

The results I show in here were runned in a machine with these characteristics:

* Windows 10
* CPU Intel i7-6770HQ @ 2.60 Ghz
* Node v10.16.0 (Actual LTS)

## How the benchmkark is built

There are two different servers

### Data-server

The data-server listens REST requests at port 5005 and gRPC requests at port 50051, both of them returns the "same" response.

A list of cities with their countries and geo-positions. I limited the list to 1500 cities, to avoid high download times.

### Proxy

The proxy server is a REST server which has two endpoints **cities-rest** and **cities-grpc** the first one does a request to the rest endpoint of data-server and the other you can imagine what it does.   

## How to run the test

I used the package [loadtest](https://www.npmjs.com/package/loadtest)

```bash
# Install loadtest.
$ npm install -g loadtest
# Install dependencies
$ npm install
# Run the two servers
$ npm run start
# Run test for rest endpoint 1000 requests 100 concurrently
$ loadtest.cmd -n 1000 -c 100 http://localhost:3000/cities-rest
# Run test for gRPC endpoint 1000 requests 100 concurrently
$ loadtest.cmd -n 1000 -c 100 http://localhost:3000/cities-grpc
```

## Results

### loadtest.cmd -n 1000 -c 100 http://localhost:3000/cities-rest

```bash
[Sat Jun 08 2019 23:12:46 GMT+0200 (GMT+02:00)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Sat Jun 08 2019 23:12:51 GMT+0200 (GMT+02:00)] INFO Requests: 683 (68%), requests per second: 137, mean latency: 684.8 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Target URL:          http://localhost:3000/cities-rest
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Max requests:        1000
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Concurrency level:   100
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Agent:               none
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Completed requests:  1000
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Total errors:        0
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Total time:          7.449329801 s
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Requests per second: 134
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Mean latency:        702.4 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO Percentage of the requests served within a certain time
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO   50%      725 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO   90%      756 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO   95%      768 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO   99%      774 ms
[Sat Jun 08 2019 23:12:53 GMT+0200 (GMT+02:00)] INFO  100%      779 ms (longest request)
```

### loadtest.cmd -n 1000 -c 100 http://localhost:3000/cities-grpc

```bash
[Sat Jun 08 2019 23:13:44 GMT+0200 (GMT+02:00)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Requests: 906 (91%), requests per second: 182, mean latency: 525.7 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Target URL:          http://localhost:3000/cities-grpc
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Max requests:        1000
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Concurrency level:   100
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Agent:               none
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Completed requests:  1000
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Total errors:        0
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Total time:          5.567429801 s
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Requests per second: 180
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Mean latency:        525.9 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO Percentage of the requests served within a certain time
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO   50%      528 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO   90%      548 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO   95%      571 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO   99%      691 ms
[Sat Jun 08 2019 23:13:49 GMT+0200 (GMT+02:00)] INFO  100%      738 ms (longest request)
```

## Results

* REST Mean latency: 702.4ms
* gRPC Mean latency: 525.9ms

* REST Total time: 7.44s
* gRPC Total time: 5.56s

* REST Request per second: 134
* gRPC Request per second: 180
