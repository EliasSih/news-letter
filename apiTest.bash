# install jq: https://stedolan.github.io/jq/download/

dc="us17"
apikey="87193ec4055fa99284bd55854c22d416-us17"

curl -sS \
  "https://${dc}.api.mailchimp.com/3.0/ping" \
  --user "anystring:${apikey}" | jq -r
