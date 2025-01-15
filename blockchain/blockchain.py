import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import hashlib
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        # Create the genesis block
        self.new_block(previous_hash='1', proof=100)

    def new_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        self.current_transactions = []
        self.chain.append(block)
        return block
    
    def mine_block(self, miner_address, **kwargs):
        """
        Mines a new block and optionally adds dynamic rewards or metadata.

        Parameters:
        - miner_address: The address of the miner receiving the reward.
        - kwargs: Optional metadata or parameters for additional customization.
        """
        last_block = self.last_block
        last_proof = last_block['proof']
        proof = self.proof_of_work(last_proof)

        # Add a reward transaction for the miner
        self.new_transaction(sender="0", recipient=miner_address, **kwargs)

        # Forge the new block
        new_block = self.new_block(proof)
        return new_block

    def new_transaction(self, **kwargs):
        """
        Add a new transaction dynamically.
        Any key-value pair can be added as part of the transaction.
        """
        self.current_transactions.append(kwargs)
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        return self.chain[-1]

    def proof_of_work(self, last_proof):
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"


# Instantiate Flask and the Blockchain
app = Flask(__name__)
CORS(app)
blockchain = Blockchain()

# Load voting data dynamically
@app.route('/api/votingData', methods=['GET'])
def get_voting_data():
    """
    Serve voting data dynamically from votingData.json.
    """
    try:
        file_path = os.path.join(os.path.dirname(__file__), '../src/data/votingData.json')
        with open(file_path, 'r') as file:
            voting_data = json.load(file)
        return jsonify(voting_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    """
    Add a new transaction dynamically.
    """
    values = request.get_json()

    if not values:
        return jsonify({"error": "Missing transaction data"}), 400

    # Add the transaction dynamically
    index = blockchain.new_transaction(**values)

    response = {
        'message': f'Transaction will be added to Block {index}',
        'transaction': values
    }
    return jsonify(response), 201


@app.route('/mine', methods=['POST'])
def mine():
    """
    Mine a new block dynamically with optional parameters.
    """
    values = request.get_json()

    # Check for the required miner address
    if not values or 'miner_address' not in values:
        return jsonify({"error": "Miner address is required"}), 400

    miner_address = values['miner_address']
    optional_metadata = {k: v for k, v in values.items() if k != 'miner_address'}

    # Mine a new block
    try:
        new_block = blockchain.mine_block(miner_address, **optional_metadata)
        response = {
            'message': "New block mined successfully!",
            'block': new_block,
            'optional_metadata': optional_metadata
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {'chain': blockchain.chain, 'length': len(blockchain.chain)}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
