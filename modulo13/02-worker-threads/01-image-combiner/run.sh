IMAGE_URL="https://i.pinimg.com/originals/a6/35/98/a635984c4a883ffb62d684586c7e2c03.png"
BACKGROUND_URL="https://wallpaperaccess.com/full/815769.jpg"


# curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
npx autocannon --renderStatusCodes -c 500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"