# Streams in Node.js

Streams are a fundamental concept in Node.js that allow for efficient handling of data, especially when dealing with large amounts of information. In this repository, we will explore the usage of streams by benchmarking different stream implementations, creating custom streams, and ultimately building an encrypt/decrypt project using transform streams.

## Benchmarking Streams

To understand the performance characteristics of different stream implementations, we will conduct benchmarking tests. By comparing the speed and memory usage of various stream types, we can make informed decisions about which streams are best suited for specific use cases.

## Benchmarking Stream Writing

To benchmark stream writing from 1 to millions in a file, we can compare different solutions using various stream implementations. Here are five solutions to consider:

1. **promise fs**: This solution utilizes the `fs/promises` module, which provides promise-based APIs for file operations. By leveraging promises, you can write numbers to a file in an asynchronous and non-blocking manner.

2. **callback fs**: This solution uses the traditional callback-based APIs of the `fs` module. It allows you to write numbers to a file using callbacks, which can be useful in certain scenarios where callback-based programming is preferred.

3. **synchronous fs**: This solution involves using synchronous file operations provided by the `fs` module. While synchronous operations can block the event loop, they can be simpler to work with in certain cases. You can benchmark the performance of writing numbers synchronously to a file.

4. **naive stream solution**: This solution involves using a basic implementation of a writable stream to write numbers to a file. While this approach may not be the most efficient, it can serve as a starting point for understanding the fundamentals of stream writing.

5. **better solution**: This solution involves using a more optimized and efficient implementation of a writable stream. By leveraging the power of Node.js stream APIs, you can improve the performance of writing numbers to a file.

By benchmarking these different solutions, you can gain insights into their performance characteristics and make informed decisions about which approach is best suited for your specific use case.

Remember to consider factors such as speed, memory usage, and scalability when evaluating the performance of each solution.

You can see the implementation of these different stream solutions in the `stream-usage`folder of this repository. The folder contains separate files for each solution, showcasing the code and usage examples for benchmarking stream writing.

Feel free to explore the code and experiment with different stream implementations to understand their performance characteristics and choose the best approach for your specific use case.

Happy coding!

## Creating Custom Streams

In addition to exploring built-in streams, we will also dive into creating our own custom streams. Custom streams provide flexibility and allow us to tailor the data processing to our specific needs. We will explore both readable and writable custom streams, leveraging the power of Node.js stream APIs.

### Custom Writable Stream

A writable custom stream allows us to define how data is written to a destination. By extending the `Writable` class from the Node.js `stream` module, we can create a custom writable stream that processes data in a specific way. This can be useful for tasks such as logging, data transformation, or writing to a custom data store.

So I have create a custom writable stream which gets a file path and writes the data to that file. You can find the implementation in the `custom-writable-stream` folder.

### Custom Readable Stream

A readable custom stream allows us to define how data is read from a source. By extending the `Readable` class from the Node.js `stream` module, we can create a custom readable stream that generates data in a specific way. This can be useful for tasks such as reading from a custom data source, generating data on-the-fly, or processing data before it is consumed.

So I have create a custom readable stream which gets a file path and reads and logs that. You can find the implementation in the `custom-readable-stream` folder.

### Custom Duplex Stream

A duplex stream combines the functionality of both readable and writable streams, allowing for bidirectional data flow. By extending the `Duplex` class from the Node.js `stream` module, we can create a custom duplex stream that processes data in both directions. This can be useful for tasks such as data transformation, protocol handling, or real-time communication.

So I have create a custom duplex stream which gets a file path and reads and writes the data to other file. You can find the implementation in the `custom-duplex-stream` folder.

By creating custom streams, we can tailor the data processing to our specific needs and build powerful data pipelines that efficiently handle data in Node.js.

## Encrypt/Decrypt Project using Transform Streams

To demonstrate the practical application of streams, we will build an encrypt/decrypt project using transform streams. Transform streams allow us to modify data as it passes through the stream pipeline. By leveraging encryption algorithms, we can securely encrypt and decrypt data in real-time, providing a valuable tool for data protection.

Stay tuned as we dive deeper into the world of streams and explore their vast potential in Node.js!

For more information on streams in Node.js, please refer to the [official Node.js documentation](https://nodejs.org/api/stream.html).
