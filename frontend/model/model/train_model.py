import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

# Dummy training data matching features.py
data = {
    "tx_count": [10, 200, 5, 500, 80, 3, 450, 15],
    "contracts_interacted": [2, 50, 1, 80, 15, 0, 75, 3],
    "avg_gas": [30, 50, 25, 70, 45, 20, 65, 35],
    "votes_cast": [0, 8, 0, 12, 2, 0, 10, 1],
    "dao_count": [0, 3, 0, 4, 1, 0, 5, 0],
    "nft_mints": [0, 15, 0, 20, 5, 0, 18, 1],
    "social_score": [100, 800, 50, 900, 400, 20, 850, 150],
    "is_good": [0, 1, 0, 1, 1, 0, 1, 0]  # label: 1 = good wallet, 0 = bad
}

df = pd.DataFrame(data)

X = df.drop(columns=["is_good"])
y = df["is_good"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
output_path = os.path.join(os.path.dirname(__file__), "reputation_model.pkl")
joblib.dump(model, output_path)

print(f"✅ Model trained and saved at {output_path}")
