FROM java:8u111
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
WORKDIR /app
ADD ./target/smartcar-0.0.1-SNAPSHOT.jar /app
EXPOSE 7070
CMD ["java","-jar","smartcar-0.0.1-SNAPSHOT.jar"]