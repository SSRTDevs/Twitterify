import requests
import json 

url = "https://gpt-summarization.p.rapidapi.com/summarize"

mock_text = '''For instance, if you're writing a business report or proposal, you could say:
“We are a global software company based in San Francisco. Our mission is to revolutionize how people manage their finances and pay their bills worldwide. Our customer base includes millions of individuals across more than 50 countries who use our products to keep track of their spending habits, set budgets, and make payments on time every month.
Our customers love our product because it allows them to easily see their financial history and make more informed decisions about their spending. However, due to issues with data quality management (DQM), some products have not been working properly for months at a time while we address this problem.
This issue has impacted our ability to complete new feature development; it's hard for us as developers or designers to work on new features when there are bugs that prevent users from using existing ones correctly."
This summary says a lot in just a few paragraphs. The reader knows who the company is, what they do, where they're based, and how many customers they have. We also learn about the company's problem and how it's impacting their business. All of this information is essential to understanding the context of the situation.
That's what an executive summary is all about—giving the reader a clear and concise overview of the situation so they can be fully informed before diving into the details.
Provide background information about your topic in a concise way
'''


payload = {"text": mock_text, "num_sentences": 3}
payload = json.dumps(payload)

headers = {
    'x-rapidapi-host': "gpt-summarization.p.rapidapi.com",
    'x-rapidapi-key': "09e55aafc1msh97c57454acd7d8ep1ccfe5jsn481563514132",
    'content-type': "application/json"
}

def summarizer():

    response = requests.request("POST", url, data=payload, headers=headers)
    return response.text


