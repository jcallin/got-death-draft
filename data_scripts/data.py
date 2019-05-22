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
    f = open("data.json")
    data_json = json.loads(f)

    # Make a dict of names to their guesses to make things easier
    names_to_guesses = {}
    for guess in data_json:
        names_to_guesses[guess['name']] = guess['dead']
    
    # Make a set of names of who actually died
    actually_died = [
        'Gregor (The Mountain)',
        'Euron',
        'Sandor',
        'Varys',
        'Cersei',
        'Jamie',
        'Qyburn'
    ]

    data = []
    for name in names:
        # Start with a single item in the row, the name
        name_row = [name]
        incorrect_counter = 0
        correct_counter = 0
        # Count correct and incorrect guesses, adding entries to the person's row
        for dead in actually_died:
            if dead in set(names_to_guesses[name]):
                correct_counter += 1
                name_row.append('✓')
            else:
                incorrect_counter += 1
                name_row.append('X')
    
        # Account for the 4 characters who had already died
        incorrect_guesses_taken = len(names_to_guesses[name]) - correct_counter - 4
        final_score = correct_counter - incorrect_guesses_taken
        name_row.append(correct_counter)
        name_row.append(incorrect_guesses_taken)
        name_row.append(final_score)
        data.append(name_row)

    title_row = [
        '',
        'Gregor (The Mountain)',
        'Euron',
        'Sandor',
        'Varys',
        'Cersei',
        'Jamie',
        'Qyburn',
        'Correct',
        'Incorrect',
        'Final Score'
    ]
    # Sort by final score
    data.append(name_row)
    # Prepend the title row
    data = [title_row] + data

    table = ff.create_table(data, index=True)
    py.iplot(table, filename='Season 8 Episode 5 Winners')

