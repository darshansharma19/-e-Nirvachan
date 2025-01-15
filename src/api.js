const BASE_URL = "http://localhost:5000"; // Backend URL

export const getBlockchain = async () => {
  try {
    const response = await fetch(`${BASE_URL}/chain`);
    if (!response.ok) {
      throw new Error("Failed to fetch blockchain data.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Mines a new block and allows dynamic parameters.
 * @param {string} minerAddress - Address of the miner to receive the reward.
 * @param {Object} metadata - Optional additional data to include in the mining request.
 * @returns {Promise<Object>} - Returns the response from the mining API.
 */
export const mineBlock = async (minerAddress, metadata = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/mine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        miner_address: minerAddress,
        ...metadata, // Optional additional metadata
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to mine a new block.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in mineBlock:", error);
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await fetch(`${BASE_URL}/transactions/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error("Failed to create transaction.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
