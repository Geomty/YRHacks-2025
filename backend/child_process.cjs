const logger = require("./logger.cjs");
const getResponse = require("./api.cjs");

async function handleClient(client) {
    // Setup

    client.send("Child process running");
    client.on("message", async link => {
        console.log(link.toString());
        // Get request to generate more nodes
        // let response = await getResponse(link);
        let response = `Quantum Computing Basics; An introduction to the fundamental concepts of quantum computing, including superposition, entanglement, and quantum gates.; https://www.quantumnumbers.com/quantum-computing-basics/
Quantum Gates; Explanation of the basic quantum logic gates, such as Hadamard, CNOT, and Pauli gates, and their operations.; https://qiskit.org/textbook/ch-states/representing-qubits.html
Superposition and Entanglement; Detailed description of superposition and entanglement, two key quantum phenomena that enable quantum computation.; https://www.youtube.com/watch?v=g_IaVepNDT4
Boolean Functions; Definition and examples of Boolean functions, which are the basis for classical computation and are also relevant to quantum algorithms.; https://www.geeksforgeeks.org/boolean-algebra-set-1-introduction/
Modular Arithmetic; An explanation of modular arithmetic, which plays a crucial role in algorithms such as Shor's algorithm and is also relevant to the Deutsch-Jozsa algorithm. ; https://mathworld.wolfram.com/ModularArithmetic.html
Quantum Oracles; Description of quantum oracles and their role in quantum algorithms; https://quantumcomputing.stackexchange.com/questions/2216/what-is-a-quantum-oracle
Hadamard Transform; Explanation of the Hadamard transform and its application in quantum computing.; https://en.wikipedia.org/wiki/Hadamard_transform_(quantum)
Linear Algebra Basics; Overview of fundamental linear algebra concepts such as vectors, matrices, and their operations, which are essential for understanding quantum mechanics and quantum algorithms.; https://www.khanacademy.org/math/linear-algebra
Probability Theory Basics; Overview of fundamental probability concepts,  necessary to understand the probabilistic nature of quantum measurements.; https://www.khanacademy.org/math/statistics-probability`;
        response = response.split("\n");
        for (let i = response.length - 1; i >= 0; i--) {
            if (!response[i].includes("://") || !response[i].includes("; ")) {
                response.splice(i, 1);
            } else {
                // Title, Description, Link
                response[i] = response[i].split("; ");
                if (response[i].length != 3) {
                    response.splice(i, 1);
                }
                response[i][1] = response[i][1].trim();
            }
        }
        client.send(JSON.stringify(response));
    });
}

module.exports = handleClient;
