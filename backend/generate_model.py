import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X = np.array([
    [1, 0], [1, 1], [0, 1], [0, 0],
    [1, 0], [0, 1], [1, 1], [0, 0]
]) 

y = np.array([1, 0, 1, 0, 1, 1, 0, 0])  


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')

model_filename = 'emotional_resilience_model.pkl'
joblib.dump(model, model_filename)
print(f'Model saved as {model_filename}')
