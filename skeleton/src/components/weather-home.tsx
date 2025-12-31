"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react"
import StickFigure from "@/components/stick-figure"

// Mock weather data - replace with real API in production
const mockWeatherData = {
    location: "서울",
    temperature: 18,
    feelsLike: 16,
    condition: "cloudy", // 'sunny', 'cloudy', 'rainy'
    humidity: 65,
    windSpeed: 12,
    uvIndex: 5,
    visibility: 10,
    activityScore: 75,
}

export default function WeatherHome() {
    const [weather, setWeather] = useState(mockWeatherData)
    const [currentTime, setCurrentTime] = useState<Date | null>(null)

    useEffect(() => {
        setCurrentTime(new Date())
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case "sunny":
                return <Sun className="w-24 h-24 text-yellow-400" />
            case "cloudy":
                return <Cloud className="w-24 h-24 text-gray-400" />
            case "rainy":
                return <CloudRain className="w-24 h-24 text-blue-400" />
            default:
                return <Cloud className="w-24 h-24 text-gray-400" />
        }
    }

    const getActivityMessage = (score: number) => {
        if (score >= 80) {
            return {
                title: "완벽한 외출 날씨!",
                description: "밖에 나가서 활동하기 딱 좋은 날씨예요",
                emoji: "🏃‍♂️",
            }
        }
        return {
            title: "실내 활동 추천",
            description: "오늘은 실내에서 편안하게 보내세요",
            emoji: "☕",
        }
    }

    const activityMessage = getActivityMessage(weather.activityScore)

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">오늘 뭐 입지? 🌤️</h1>
                    <p className="text-muted-foreground text-lg">
                        {currentTime ? currentTime.toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            weekday: "long",
                        }) : "..."}
                    </p>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Weather Info (65-70%) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Weather Card */}
                        <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-6xl md:text-8xl font-bold text-primary mb-2">{weather.temperature}°</h2>
                                    <p className="text-2xl text-muted-foreground mb-1">{weather.location}</p>
                                    <p className="text-lg text-muted-foreground">체감 {weather.feelsLike}°</p>
                                </div>
                                <div className="animate-bounce-slow">{getWeatherIcon(weather.condition)}</div>
                            </div>

                            {/* Weather Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <Droplets className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">습도</p>
                                        <p className="text-xl font-bold">{weather.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <Wind className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">풍속</p>
                                        <p className="text-xl font-bold">{weather.windSpeed}m/s</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <Sun className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">자외선</p>
                                        <p className="text-xl font-bold">{weather.uvIndex}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <Eye className="w-8 h-8 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">가시거리</p>
                                        <p className="text-xl font-bold">{weather.visibility}km</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Section - Activity Score & Outfit */}
                    <div className="space-y-6">
                        {/* Activity Score */}
                        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 hover:shadow-xl transition-all duration-300">
                            <div className="text-center mb-4">
                                <div className="text-6xl mb-4 animate-pulse">{activityMessage.emoji}</div>
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            className="text-muted/20"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 56}`}
                                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - weather.activityScore / 100)}`}
                                            className="text-primary transition-all duration-1000"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-primary">{weather.activityScore}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-balance">{activityMessage.title}</h3>
                                <p className="text-muted-foreground text-balance">{activityMessage.description}</p>
                            </div>
                        </Card>

                        {/* Outfit Recommendation */}
                        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold mb-4 text-center">오늘의 옷차림</h3>
                            <div className="flex items-center justify-center">
                                <StickFigure temperature={weather.temperature} condition={weather.condition} />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-muted-foreground">
                                    {weather.temperature >= 25 && "반팔과 반바지로 시원하게!"}
                                    {weather.temperature >= 20 && weather.temperature < 25 && "긴팔 하나면 충분해요"}
                                    {weather.temperature >= 15 && weather.temperature < 20 && "가벼운 겉옷을 챙기세요"}
                                    {weather.temperature >= 10 && weather.temperature < 15 && "후드티나 자켓 추천!"}
                                    {weather.temperature >= 5 && weather.temperature < 10 && "코트나 패딩을 입으세요"}
                                    {weather.temperature < 5 && "두꺼운 패딩 필수!"}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
