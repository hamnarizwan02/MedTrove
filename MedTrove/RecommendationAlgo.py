import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer

# Sample data: users and their search history
user_data = {
    'User 1': ['Thermovin', 'Cortisolyn', 'Zemotril', 'Amproxil', 'Neurophene', 'Glucarex', 'Ventronil', 'Ribemax'],
    'User 2': ['Throatrelief', 'Gargilox', 'Sorezen', 'Laryntrol', 'Pharynex', 'Voicare', 'Soothimax'],
    'User 3': ['Gastrolieve', 'Abdomax', 'Tummicare', 'Digestinol', 'Pangone', 'Enteroflex', 'Relievaid', 'Stomacease']
}

# Transform the data to a user-item matrix
mlb = MultiLabelBinarizer()
user_item_matrix = pd.DataFrame(mlb.fit_transform(user_data.values()),
                                index=user_data.keys(),
                                columns=mlb.classes_)

# Calculate cosine similarity between users
user_similarity = pd.DataFrame(cosine_similarity(user_item_matrix),
                               index=user_item_matrix.index,
                               columns=user_item_matrix.index)

# Function to recommend medicines for a specific user based on similar users' search history
def recommend_medicines(target_user, user_item_matrix, user_similarity, top_n=3):
    similar_users = user_similarity[target_user].sort_values(ascending=False).drop(target_user).index
    recommended_medicines = set()
    for user in similar_users:
        potential_recommendations = set(user_item_matrix.loc[user][user_item_matrix.loc[user] > 0].index)
        already_searched = set(user_item_matrix.loc[target_user][user_item_matrix.loc[target_user] > 0].index)
        new_recommendations = potential_recommendations - already_searched
        recommended_medicines.update(new_recommendations)
        if len(recommended_medicines) >= top_n:
            break
    return list(recommended_medicines)[:top_n]

# Example recommendation for User 1
recommendations_for_user1 = recommend_medicines('User 1', user_item_matrix, user_similarity, top_n=10)
print("Recommended medicines for User 1:", recommendations_for_user1)
