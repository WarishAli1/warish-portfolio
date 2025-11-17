const blogs = [
  {
    id: "ml-classification",
    title: "Neural Network Classification",
    date: "2025-10-31",
    mainCategory: "Machine Learning",
    subCategory: "Classification",
    images: ["/classification1.png", "/classification2.png"],
    description: "See how neural networks transform raw data into accurate classifications.",
    content: `
# Introduction

When I first started learning Machine Learning (ML) and Deep Learning, one of the first things I explored was classification models.

Classification is about teaching a model to categorize things — for example, identifying whether an image shows a dog or cat, or deciding whether an email is spam or not spam. It is a form of **supervised learning**, where the model learns from labeled data, meaning each input comes with a known output, and the model learns the mapping between inputs and outputs.

I quickly learned that there are two main types of classification:

- **Binary Classification** – when there are only two classes.
- **Multi-Class Classification** – when there are more than two classes.

## Binary Classification

Binary classification means the model predicts between two outcomes, like:

- Dog or Cat  
- Spam or Not Spam  
- 0 or 1

### Dataset for Binary Classification

I used the **make_circles()** dataset, which creates two concentric circles making a non-linearly separable problem — perfect for learning classification.

\`\`\`python
from sklearn.datasets import make_circles

X, y = make_circles(n_samples=1000, noise=0.03, random_state=42)
\`\`\`

### Binary Model: CircleModelV2

Here is a simple neural network for binary classification using PyTorch:

\`\`\`python
import torch
from torch import nn

class CircleModelV2(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer_1 = nn.Linear(2, 10)
        self.relu = nn.ReLU()
        self.layer_2 = nn.Linear(10, 10)
        self.layer_3 = nn.Linear(10, 1)

    def forward(self, x):
        z = self.layer_1(x)
        z = self.relu(z)
        z = self.layer_2(z)
        z = self.relu(z)
        z = self.layer_3(z)
        return z
\`\`\`

### Training the Binary Model

You can train the model with a binary cross-entropy loss combined with a sigmoid activation, using **BCEWithLogitsLoss** which integrates both for numerical stability:

\`\`\`python
loss_fn = nn.BCEWithLogitsLoss()
optimizer = torch.optim.SGD(params=model_0.parameters(), lr=0.1)
\`\`\`

### Training Loop for Binary Classification

\`\`\`python
epochs = 1000
for epoch in range(epochs):
    model_0.train()
    y_logits = model_0(X_train)
    y_pred = torch.sigmoid(y_logits)
    loss = loss_fn(y_logits, y_train)

    optimizer.zero_grad()        # clear previous gradients
    loss.backward()              # compute gradients
    optimizer.step()             # update parameters

    if epoch % 100 == 0:
        print(f"Epoch {epoch}: Loss = {loss.item():.4f}")
\`\`\`

The **sigmoid activation** is applied in the final layer because it squashes the output logits to a range between **0 and 1**, which represents the probability of belonging to the positive class (e.g., 1 = "dog").  

This makes it ideal for **binary classification**, where the output represents a single probability value.

Here, **loss.backward()** computes the gradients for all model parameters, and **optimizer.step()** updates them in the direction that **reduces the loss**. We can think of it as being at the top of a hill, where the slope represents the gradient, and we take small steps downward to reach the lowest point (minimum loss).

We use **optimizer.zero_grad()** before each backward pass to **reset gradients** from the previous iteration — otherwise, they would **accumulate**, leading to incorrect parameter updates.

### Visualizing the Decision Boundary

After training, I visualized whether our model successfully distinguished or classified the data correctly on both training and testing sets:

\`\`\`python
plt.figure(figsize=(12,6))
plt.subplot(1,2,1)
plt.title("Train")
plot_decision_boundary(model_0, X_train, y_train)
plt.subplot(1,2,2)
plt.title("Test")
plot_decision_boundary(model_0, X_test, y_test)
\`\`\`

![Binary Classification Visualization](/classification1.png)

---

## Multi-Class Classification

Multi-class classification predicts one class out of several possible categories, such as:

- Dog , Cat , Cow

### Dataset for Multi-Class

Using **make_blobs()**, we can generate clusters representing different classes:

\`\`\`python
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
import torch

NUM_CLASSES = 4
NUM_FEATURES = 2
RANDOM_SEED = 42

X_blob, y_blob = make_blobs(
    n_samples=1000,
    n_features=NUM_FEATURES,
    centers=NUM_CLASSES,
    cluster_std=1.5,
    random_state=RANDOM_SEED
)
\`\`\`

### Multi-Class Model: BlobModel

\`\`\`python
class BlobModel(nn.Module):
    def __init__(self, input_features, output_features, hidden_units=8):
        super().__init__()
        self.linear_layer_stack = nn.Sequential(
            nn.Linear(input_features, hidden_units),
            nn.ReLU(),
            nn.Linear(hidden_units, 16),
            nn.ReLU(),
            nn.Linear(16, hidden_units),
            nn.ReLU(),
            nn.Linear(hidden_units, 16),
            nn.ReLU(),
            nn.Linear(16, output_features)
        )

    def forward(self, x):
        return self.linear_layer_stack(x)
\`\`\`

### Training Loop for Multi-Class Classification

\`\`\`python
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model_1.parameters(), lr=0.01)

epochs = 1000
for epoch in range(epochs):
    model_1.train()
    y_logits = model_1(X_train)
    loss = loss_fn(y_logits, y_train)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 100 == 0:
        print(f"Epoch {epoch}: Loss = {loss.item():.4f}")
\`\`\`

In **multi-class classification**, the model’s final layer outputs **raw scores (logits)** for each class.

The **softmax** function converts these logits into a **probability distribution** that sums to 1, indicating the likelihood of each class.

We don’t apply softmax manually because **nn.CrossEntropyLoss()** already applies it internally for efficiency and numerical stability.

Just like before, **loss.backward()** computes the gradients for all model parameters, and **optimizer.step()** updates them in the direction that **reduces the loss**.

### Visualizing the Decision Boundary

After training, I again visualized how well our model classified the data across multiple classes:

\`\`\`python
plt.figure(figsize=(12,6))
plt.subplot(1,2,1)
plt.title("Train")
plot_decision_boundary(model_blob, X_blob_train, y_blob_train)
plt.subplot(1,2,2)
plt.title("Test")
plot_decision_boundary(model_blob, X_blob_test, y_blob_test)
\`\`\`

![Multi-Class Classification Visualization](/classification2.png)

---

## Key Concepts I Learned

- Binary Classification deals with two distinct classes, Multi-Class Classification involves more than two. 
- A sigmoid function converts logits (raw model outputs) into probabilities between 0 and 1 for binary classification. 
- Softmax converts logits into a probability distribution over multiple classes for multi-class problems. 
- ReLU (Rectified Linear Unit) adds non-linearity enabling neural networks to learn complex functions.
- Gradient Descent is the optimization method where loss.backward() computes gradients and optimizer.step() updates model parameters.
- For multi-class classification in PyTorch, use nn.CrossEntropyLoss() which combines softmax and negative log likelihood internally.
- optimizer.zero_grad() is used to clear old gradients before each backward pass, preventing unwanted accumulation.

---

## Conclusion

Classification is a fundamental task in machine learning that enables models to categorize data into classes. Understanding the differences between binary and multi-class classification helps in selecting the right approach and architecture. Neural networks, combined with activation functions like ReLU, sigmoid, and softmax, provide powerful tools for tackling complex classification problems. Applying the right loss functions and optimization techniques contributes significantly to building effective models. Continuous experimentation and learning are key to mastering classification tasks in ML and Deep Learning.
`
  },
  {
    id: "cnn-fashionmnist",
    title: "Computer Vision",
    date: "2025-11-17",
    mainCategory: "Machine Learning",
    subCategory: "Computer Vision",
    images: [],
    description: "See how machines learn to “see” the world.",
    content: `

## INTRODUCTION

After learning about classification models, I became really curious about computer vision — how computers can actually "see" and understand images like humans do. Exploring this area has been super exciting, and it's motivating me to dive deeper into neural networks and image recognition.

One of the most fascinating concepts I discovered is the Convolutional Neural Network (CNN). CNNs are a type of deep learning model specifically designed to process image data. They can automatically learn features like edges, textures, and shapes from images, which makes them incredibly powerful for tasks like object detection, image classification, and more.

In this blog, I'll share my journey of building a CNN using PyTorch and torchvision, step by step, while exploring the FashionMNIST dataset. You'll see how I prepare data, design the network, train it, and evaluate its performance — all while learning how CNNs really work.

## Import Required Libraries

Before we start coding, we need to import the required libraries:

\`\`\`python
# PyTorch
import torch
from torch import nn

# Torchvision
import torchvision
from torchvision import datasets, transforms
from torchvision.transforms import ToTensor

# Matplotlib for visualization
import matplotlib.pyplot as plt
\`\`\`

These libraries allow us to handle datasets, build neural networks, apply transforms, and visualize results.

##  Load the FashionMNIST Dataset

We will use the FashionMNIST dataset, which contains 70,000 grayscale images, each representing clothing items.

\`\`\`python
train_data = datasets.FashionMNIST(
    root="data",
    train=True, 
    transform=ToTensor(), 
    download=True
)

test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    transform=ToTensor(),
    download=True
)
\`\`\`

**Explanation:**

- **root="data"**: Dataset will be stored in a folder named data. If it doesn't exist, it will be created automatically.
- **train=True**: Loads 60,000 images for training.
- **train=False**: Loads 10,000 images for testing.
- **transform=ToTensor()**: Converts images to tensors and normalizes pixel values from 0–255 to 0–1 floats.
- **target_transform=None**: Labels are not transformed.

## Visualizing the Dataset
Showing 16 random samples from the FashionMNIST dataset helps us quickly understand the type of images and labels we will be working with.

\`\`\`python
torch.manual_seed(42)
fig = plt.figure(figsize=(9,9))
rows , cols = 4,4
for i in range(1,rows*cols+1):
  random_idx = torch.randint(0,len(train_data),size=[1]).item()
  img , label = train_data[random_idx]
  fig.add_subplot(rows,cols,i)
  plt.imshow(img.squeeze(),cmap="gray")
  plt.axis(False)
  plt.title(class_names[label])
\`\`\`

![FashionMNIST Visualization](/cnn3.png)

## Prepare DataLoader

PyTorch datasets are convenient, but to efficiently train our model, we convert datasets into batches using DataLoader:

\`\`\`python
from torch.utils.data import DataLoader

BATCH_SIZE = 32

train_dataloader = DataLoader(dataset=train_data, batch_size=BATCH_SIZE, shuffle=True)
test_dataloader = DataLoader(dataset=test_data, batch_size=BATCH_SIZE, shuffle=False)
\`\`\`

**Why use DataLoader?**

1. Converts datasets into iterables so we can loop through batches.
2. Batching is computationally efficient — instead of loading all 60,000 images at once, we load 32 images at a time.
3. Shuffling the training data helps the model learn more features rather than memorizing order.
4. Shuffling test data is not necessary.

## Understand CNN Input Features and Shapes

Before building the CNN, it is important to understand input features, channels, and batch shapes:

- Since FashionMNIST is grayscale, the input features = 1 channel.
- If it were a color image (RGB), input features = 3 channels.
- PyTorch uses "channel-first" format: \`[batch, channels, height, width]\`

For example, after batching, our data shape will be:

\`\`\`
[32, 1, 28, 28]
\`\`\`

- **32** → Batch size (32 images per batch)
- **1** → Number of color channels (grayscale)
- **28** → Image height
- **28** → Image width

**Note:** TensorFlow/Keras uses channel-last format: \`[batch, height, width, channels]\`

**Why channels are considered input features:**

1. Each channel contains independent information about the image.
2. Convolutional layers slide filters/kernels over the input.
3. Each kernel looks at all channels simultaneously.
4. If the input has 3 channels, the kernel also has depth = 3, meaning one weight per channel per position.

## Define the CNN Model

Now we define the CNN model for image recognition:

\`\`\`python
class FashionMNISTModelV2(nn.Module):
    def __init__(self, input_features:int, output_features:int, hidden_units:int):
        super().__init__()
        self.conv_block_1 = nn.Sequential(
            nn.Conv2d(input_features, hidden_units, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        )
        self.conv_block_2 = nn.Sequential(
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_units, hidden_units, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(hidden_units*7*7, output_features)
        )

    def forward(self, x):
        x = self.conv_block_1(x)
        x = self.conv_block_2(x)
        x = self.classifier(x)
        return x
\`\`\`

## Explanation of Layers

### 1. Convolutional Layers (Conv2D)

- **Definition:**  
  A **convolutional layer** is a fundamental component of a CNN that uses small filters (kernels) to scan an image and detect important features. As the filter slides over the image, it takes dot products at each position to form a feature map, helping identify edges, corners, textures, and other patterns.

- **Parameters:**
  - **Kernel / Filter:**  
    Small matrices that start with random values. During training, the network updates these values to learn useful features. 

  - **Padding:**  
    Extra pixels (usually zeros) added around the image to keep output size the same and preserve border information.

  - **Stride:**  
    Controls how many pixels the filter moves at each step.  
    Higher stride → smaller output but may skip details.

### 2. MaxPooling Layers (MaxPool2D)

- **Definition:**  
  Max pooling is a pooling operation that picks the **maximum value** from a small region of the feature map (output of the image after convolution). It uses a sliding window (like 2×2) and from each window, it selects the highest value. This creates a smaller feature map that keeps only the **most important or strongest features** from the previous layer. It does **not learn** anything — it simply picks values.

- **Parameters:**
  - **Kernel / Window Size:**  
    A small window (e.g., 2×2 or 3×3) that slides over the feature map.  
    Inside each window, max pooling **selects only the maximum value**.
  
  - **Stride:**  
    Controls how far the window moves each time.  
    - Stride = 2 is common (non-overlapping windows).  
    - Larger stride → more reduction in size.

  - **Padding (optional):**  
    Usually not used in pooling, but if added, it can adjust output size by adding extra pixels around the feature map. 

### 3. ReLU Layer (Rectified Linear Unit) 
   - **Definition:**  
     ReLU is an activation function that introduces non-linearity to the model. It transforms input values by setting all negative values to zero and keeping positive values unchanged. This helps the network learn complex patterns in the data.

   - **Function:** ReLU(x) = \max(0, x)

### 4. Flatten Layer
   - **Definition:**  
     It Converts multi-dimensional feature maps into a **single-dimensional vector** so it can be passed to the fully connected layer. It does not have weights or biases — just reshapes the data.  

 For visual explanations of CNNs, see [CNN Explainer](https://poloclub.github.io/cnn-explainer/).

## Loss, and Optimizer

Since this is a multi-class classification problem:

\`\`\`python
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(params=model_0.parameters(), lr=0.1)
\`\`\`

- **Loss function**: Cross-entropy loss
- **Optimizer**: Stochastic Gradient Descent (SGD)

## Training and Evaluation

\`\`\`python
from tqdm.auto import tqdm
from timeit import default_timer as timer

torch.manual_seed(42)
start_timer = timer()

epochs = 3
for epoch in tqdm(range(epochs)):
    print(f"Epoch: {epoch}\\n---------")
    
    train_loss = 0
    for batch, (X, y) in enumerate(train_dataloader):
        model_0.train()  # Training mode
        y_pred = model_0(X)
        loss = loss_fn(y_pred, y)
        train_loss += loss
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        if batch % 400 == 0:
            print(f"Looked at {batch*len(X)}/{len(train_dataloader.dataset)} samples")
    
    train_loss /= len(train_dataloader)

    # Testing
    test_loss, test_acc = 0, 0
    model_0.eval()  # Evaluation mode
    with torch.inference_mode():
        for X_test, y_test in test_dataloader:
            test_pred = model_0(X_test)
            test_loss += loss_fn(test_pred, y_test)
            test_acc += accuracy_fn(y_true=y_test, y_pred=test_pred.argmax(dim=1))
    
    test_loss /= len(test_dataloader)
    test_acc /= len(test_dataloader)
    
    print(f"Train loss: {train_loss:.4f} | Test loss: {test_loss:.4f} | Test acc: {test_acc:.2f}")

end_timer = timer()
total_time_model_0 = print_train_time(start=start_timer, end=end_timer)
\`\`\`

**Key Notes:**

- **model_0.train()**: Activates training mode. Layers like Dropout behave differently.
- **model_0.eval()**: Activates evaluation mode. Dropout is disabled, and BatchNorm uses running statistics.

![Training and Testing Visualization](/cnn2.png)

## **Optional Layers: Dropout & Batch Normalization**

### **Dropout**
Dropout is a technique used to reduce **overfitting**. During training, it **randomly turns off some fraction of neurons** in a layer. This prevents the network from relying too much on specific neurons or learning unwanted patterns from the training data.

Because different neurons are dropped each time, it’s like training **many smaller networks** instead of one large one. Each smaller network makes different mistakes, and together they give more stable and general predictions.

During testing, **no neurons are dropped**, so the full network is used.

### **Batch Normalization**
Batch Normalization (BatchNorm) helps make training **faster and more stable**.

For each mini-batch, BatchNorm:
1. **Normalizes** the activations using that batch’s mean and standard deviation.  
2. **Rescales** the values using two trainable parameters.

This keeps the inputs to each layer on a consistent scale, which:
- Helps the model train in fewer epochs  
- Reduces sensitivity to initialization  
- Prevents training from getting “stuck”

BatchNorm is mainly used to **improve optimization**, but it can also improve accuracy in some cases.

## Evaluating with Confusion Matrix

Finally, we can use a confusion matrix to check how well the model predicts each class:

\`\`\`python
from torchmetrics import ConfusionMatrix
from mlxtend.plotting import plot_confusion_matrix

confmat = ConfusionMatrix(num_classes=len(class_names), task="multiclass")
confmat_tensor = confmat(preds=y_preds_tensor, target=test_data.targets)

fig, ax = plot_confusion_matrix(
    conf_mat=confmat_tensor.numpy(),
    figsize=(10,7),
    class_names=class_names
)
\`\`\`

- Visualizes which classes are correctly predicted and which are confused.

![Confusion Matrix Visualization](/Cnn1.png)

## Key Concepts I Learned

1. **Using the inbuilt FashionMNIST dataset**  
   FashionMNIST is a simple grayscale dataset (1 input channel), making it perfect for learning and experimenting with CNNs.  
   Typical input shape: *[batch, 1, 28, 28]*.

2. **Understanding the main CNN layers**  
   - **Conv2D layers** extract spatial features like edges, textures, and shapes.  
   - **MaxPooling** reduces the size of feature maps and helps the model focus on important features.  
   Together, these layers form the core building blocks of most computer vision models.

3. **Model evaluation**  
   - **Accuracy** helps measure overall performance.  
   - A **confusion matrix** gives a deeper understanding of which classes the model predicts well and where it makes mistakes.

## Conclusion

Working on this project was a great experience that helped me dive deeper into how CNNs and machine learning actually work. It was a meaningful learning journey — understanding everything from datasets to layers, training steps, and evaluation made me even more curious to explore more advanced concepts in the future.

This project also introduced me to the world of **computer vision**, a field of AI that allows machines to understand and interpret images. Computer vision powers many real-life applications such as image classification, face detection, medical imaging, and self-driving cars. Learning the basics of CNNs is an important foundation because these models form the core of most computer vision systems.

Overall, this experience strengthened my understanding and motivated me to continue exploring more powerful models and techniques in deep learning.

`
  }
];
export default blogs;
