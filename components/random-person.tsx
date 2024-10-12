'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, MapPin } from 'lucide-react'

interface Person {
  name: { first: string; last: string }
  email: string
  picture: { large: string }
  location: { city: string; country: string }
}

export function RandomPersonComponent() {
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomPerson = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setPerson(data.results[0])
    } catch (err) {
      console.log(err)
      setError('An error occurred while fetching the data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomPerson()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Tilfeldig person</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : person ? (
            <div className="space-y-4">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} />
                <AvatarFallback>{person.name.first[0]}{person.name.last[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-center">{person.name.first} {person.name.last}</h2>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <p className="text-sm">{person.email}</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">{person.location.city}, {person.location.country}</p>
              </div>
            </div>
          ) : null}
          <Button 
            className="w-full mt-4" 
            onClick={fetchRandomPerson}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Generate New Person'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}