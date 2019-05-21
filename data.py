import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go

import numpy as np
import json

plotly.tools.set_credentials_file(username='example', api_key='')


def create_histogram():
    f = open("data.json").read()
    data_json = json.loads(f)
    result = {}

    # Organize into dict, where values are repeated names
    # This makes it easy to histogram-ify
    # Example {"Arya": ["Arya", "Arya", "Arya"]} indicates that Arya was guessed 3 times
    for guess in data_json:
        for dead_call in guess['dead']:
            result[dead_call] = []
    for guess in data_json:
        for dead_call in guess['dead']:
            result[dead_call].append(dead_call)

    # Sort the dead by the most guessed characters and append to final
    final_result = []
    for k in sorted(result, key=lambda k: len(result[k]), reverse=True):
            for r in result[k]:
                final_result.append(r)

    # Filter characters who are already dead and reverse
    filters = set(["Missandei", "Lyanna Mormont", "Theon", "Melisandre"])
    final_results_filtered = [x for x in final_result if x not in filters]
    final_results_filtered.reverse()

    # Plot and upload
    histogram_data = [go.Histogram(y=final_results_filtered)]
    py.iplot(histogram_data, filename='Season 8 Episode 5')

def create_winner_table():
