const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../grpc-ping-server/src/main/proto/ping-service.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const ping_proto = grpc.loadPackageDefinition(packageDefinition).ping_service;
const serverHostname = process.env.SERVER_HOSTNAME || 'localhost';
const serverPort = process.env.SERVER_PORT || '9000';

function main() {
    const client = new ping_proto.PingService(serverHostname + ':' + serverPort, grpc.credentials.createInsecure());

    var payload = { payload: 'ping grpc message' }

    client.ping(payload, function(err, response) {
        console.log('Response:', response.payload);
    });
}

if (require.main === module) {
    main();
}