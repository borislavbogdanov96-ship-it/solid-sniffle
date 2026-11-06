#!/bin/sh
input=$(cat)
model=$(echo "$input" | jq -r '.model.display_name')
used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
window_size=$(echo "$input" | jq -r '.context_window.context_window_size // empty')
cwd=$(echo "$input" | jq -r '.cwd')

# Sum all input token types for accurate count
computed_used=$(echo "$input" | jq '
  .context_window.current_usage |
  ((.input_tokens // 0) + (.cache_creation_input_tokens // 0) + (.cache_read_input_tokens // 0))
')

if [ -n "$used" ] && [ -n "$window_size" ]; then
  if [ -z "$computed_used" ] || [ "$computed_used" = "null" ] || [ "$computed_used" = "0" ]; then
    computed_used=$(echo "$used $window_size" | awk '{printf "%.0f", $1/100*$2}')
  fi
  formatted_used=$(printf "%'.0f" "$computed_used")
  formatted_total=$(printf "%'.0f" "$window_size")
  bar=$(echo "$used" | awk '{
    total=20; filled=int($1/100*total);
    bar="";
    for(i=0;i<filled;i++) bar=bar"█";
    for(i=filled;i<total;i++) bar=bar"░";
    print bar
  }')
  context_str="[${bar}] ${used}% (${formatted_used} / ${formatted_total} tokens)"
else
  context_str="context: -"
fi

printf "%s | %s | %s" "$model" "$context_str" "$cwd"
