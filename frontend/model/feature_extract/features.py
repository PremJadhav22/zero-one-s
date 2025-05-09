def extract_features(wallet_data):
    return {
        "tx_count": wallet_data.get("tx_count", 0),
        "contracts_interacted": wallet_data.get("contracts_interacted", 0),
        "avg_gas": wallet_data.get("avg_gas", 0),
        "votes_cast": wallet_data.get("votes_cast", 0),
        "dao_count": wallet_data.get("dao_count", 0),
        "nft_mints": wallet_data.get("nft_mints", 0),
        "social_score": wallet_data.get("social_score", 0),
    }
