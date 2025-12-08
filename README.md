# CabinCare-Manager
CabinCare is a small full-stack application that managing cabins and logs their maintenance needs.


performing a clean rebuild: 

docker compose down --volumes --remove-orphans
docker system prune -f
re-run the script
docker builder prune -af
docker system prune -af

docker compose build --no-cache
docker compose up
