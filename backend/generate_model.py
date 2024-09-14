import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Generate dummy data
X = np.array([
    [1, 0], [1, 1], [0, 1], [0, 0],
    [1, 0], [0, 1], [1, 1], [0, 0]
])  # Features

y = np.array([1, 0, 1, 0, 1, 1, 0, 0])  # Labels

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train a simple RandomForest model
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')

# Save the model to a .pkl file
model_filename = 'emotional_resilience_model.pkl'
joblib.dump(model, model_filename)
print(f'Model saved as {model_filename}')
