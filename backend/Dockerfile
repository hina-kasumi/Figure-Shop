# Sử dụng SDK để build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj và restore
COPY *.csproj ./
RUN dotnet restore

# Copy toàn bộ source code (bao gồm Views)
COPY . ./
RUN dotnet build -c Debug -o /app/build
RUN dotnet publish -c Debug -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy publish + views
COPY --from=build /app/publish .
COPY --from=build /src/Views ./Views
COPY --from=build /src/wwwroot ./wwwroot

EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]
