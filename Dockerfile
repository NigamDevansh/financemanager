# ---- Stage 1: Build ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

RUN echo "✅ Step 1: Base image loaded & workdir set"

# Copy Maven wrapper and pom.xml first (for dependency caching)
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

RUN echo "✅ Step 2: Copied mvnw, .mvn, and pom.xml"

# Make Maven wrapper executable & download dependencies
RUN chmod +x mvnw && echo "✅ Step 3: mvnw is now executable"
RUN echo "⏳ Step 4: Downloading dependencies..." && ./mvnw dependency:resolve -B && echo "✅ Step 4: Dependencies resolved"

# Copy source code and build the JAR (skip tests for faster builds)
COPY src ./src
RUN echo "✅ Step 5: Source code copied"

RUN echo "⏳ Step 6: Building JAR..." && ./mvnw package -DskipTests -B && echo "✅ Step 6: JAR built successfully"

RUN echo "✅ Step 7: Build stage complete. Listing target dir:" && ls -la /app/target/*.jar

# ---- Stage 2: Run ----
FROM eclipse-temurin:21-jre
WORKDIR /app

RUN echo "✅ Step 8: Runtime base image loaded"

# Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar financemanager.jar

RUN echo "✅ Step 9: JAR copied to runtime image" && ls -la financemanager.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "financemanager.jar"]