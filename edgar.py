import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

import tensorflow as tf

# Check if GPU is available
if tf.test.gpu_device_name():
    print("GPU is available")
else:
    print("GPU is not available")
    

matrix1 = tf.constant([[1, 2, 4], [3, 4 , 1],[3, 2 , 1]])  # 3x3 matrix
matrix2 = tf.constant([[5, 6 , 2], [7, 8 , 4],[2, 4 , 1]])  # 3x3 matrix

# Perform matrix multiplication
result = tf.matmul(matrix1, matrix2)

# Create a TensorFlow session
with tf.Session() as sess:
    # Evaluate the result
    output = sess.run(result)
    print("Result of matrix multiplication:")
    print(output)