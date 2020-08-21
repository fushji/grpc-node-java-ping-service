package it.fushji.grpc.ping;

import javax.inject.Singleton;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class PingService extends PingServiceGrpc.PingServiceImplBase {

    private final Logger logger = LoggerFactory.getLogger(PingService.class);

    @Override
    public void ping(final it.fushji.grpc.ping.PingRequest request,
            final io.grpc.stub.StreamObserver<it.fushji.grpc.ping.PingResponse> responseObserver) {

        logger.info("Ping request arrived: {}", request.getPayload());

        responseObserver.onNext(PingResponse.newBuilder().setPayload("PONG..." + request.getPayload()).build());
        responseObserver.onCompleted();
    }
}
