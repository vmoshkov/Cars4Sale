FROM blacklabelops/java:openjre7

ENV DERBY_VERSION=10.12.1.1 
ENV	DERBY_INSTALL=/db-derby-$DERBY_VERSION-bin 
ENV	DERBY_HOME=/db-derby-$DERBY_VERSION-bin 
ENV	CLASSPATH=$DERBY_INSTALL/lib/derbynet.jar:$DERBY_INSTALL/lib/derbytools.jar:.
ENV PORT_TO_EXPOSE=1333
	
RUN \
	apk update &&\
	apk add --update wget &&\
	wget http://archive.apache.org/dist/db/derby/db-derby-${DERBY_VERSION}/db-derby-${DERBY_VERSION}-bin.tar.gz &&\
	tar xzf db-derby-${DERBY_VERSION}-bin.tar.gz &&\
	rm -Rf /db-derby-${DERBY_VERSION}-bin.tar.gz &&\
	mkdir -p /dbs &&\
	mkdir -p /dbbackup &&\
	mkdir -p /upload &&\
	rm -Rf /var/cache/apk/* && \
    rm -Rf /tmp/* && \
	rm -Rf /var/log/*

	
VOLUME ["/dbs", "/upload"]
EXPOSE ${PORT_TO_EXPOSE}

COPY init.sql /upload/	

RUN java -Dij.outfile=myoutput.txt org.apache.derby.tools.ij /upload/init.sql

CMD ${DERBY_INSTALL}/bin/startNetworkServer -p ${PORT_TO_EXPOSE} -h 0.0.0.0
