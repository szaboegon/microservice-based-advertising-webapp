#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["AdvertisementService.WebAPI/AdvertisementService.WebAPI.csproj", "AdvertisementService.WebAPI/"]
COPY ["AdvertisementService.BusinessLogic/AdvertisementService.BusinessLogic.csproj", "AdvertisementService.BusinessLogic/"]
COPY ["AdvertisementService.DataAccess/AdvertisementService.DataAccess.csproj", "AdvertisementService.DataAccess/"]
RUN dotnet restore "AdvertisementService.WebAPI/AdvertisementService.WebAPI.csproj"
COPY . .
WORKDIR "/src/AdvertisementService.WebAPI"
RUN dotnet build "AdvertisementService.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AdvertisementService.WebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AdvertisementService.WebAPI.dll"]