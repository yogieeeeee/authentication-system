import express from "express"
import cors from "cors"
import connectDB from "./config/db/db.js"
import userRoute from "./src/routers/auth.route.js"
import userDashboard from "./src/routers/dashboard.route.js"
const app = express()
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

app.use("/api", userRoute)
app.use("/api", userDashboard)

const start = async () => {
  try {
    await connectDB()
    app.listen(3000, () => {
      console.log("Server berjalan di port 3000")
    })
  } catch (error) {
    console.error("Gagal start server:", error)
  }
}

start()
