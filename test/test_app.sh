#!/bin/bash

# Test helper functions
print_result() {
  if [ $1 -eq 0 ]; then
    echo "✅ $2"
  else
    echo "❌ $2"
    exit 1
  fi
}

# Test API endpoints
echo "Running application tests..."

# Test 1: Language detection
response=$(curl -s -X POST http://localhost:5000/api/triage \
  -H "Content-Type: application/json" \
  -d '{"text":"Tengo dolor de cabeza"}')
if [[ $response == *"es"* ]]; then
  print_result 0 "Language detection (Spanish)"
else
  print_result 1 "Language detection (Spanish)"
fi

# Test 2: Symptom assessment
response=$(curl -s -X POST http://localhost:5000/api/triage \
  -H "Content-Type: application/json" \
  -d '{"text":"Headache and fever"}')
if [[ $response == *"conditions"* ]]; then
  print_result 0 "Symptom assessment"
else
  print_result 1 "Symptom assessment"
fi

# Test 3: UI language switch (frontend test would need Cypress/Selenium)
echo "⚠️  Frontend language tests require browser automation (manual verification recommended)"

echo "All automated tests passed!"