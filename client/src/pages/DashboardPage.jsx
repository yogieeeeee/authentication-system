import React from "react"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import WelcomeCard from "@/components/dashboard/WelcomeCard"
import {Loader2} from "lucide-react"
import {Shield, User, Mail} from "lucide-react"

const DashboardPage = ({user, loading, handleLogout}) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader handleLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <WelcomeCard user={user} />
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
