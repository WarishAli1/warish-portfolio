const blogs = [
  {
    id: "ml-classification",
    title: "Exploring ML: How I Learned Neural Network Classification",
    date: "2025-10-31",
    mainCategory: "Machine Learning",
    subCategory: "Classification",
    images: ["/classification1.png", "/classification2.png"],
    description: "See how neural networks transform raw data into accurate classifications.",
    content: `
# Introduction

When I first started learning Machine Learning (ML) and Deep Learning, one of the first things I explored was classification models.

Classification is about teaching a model to categorize things. For example, identifying whether an image shows a dog or cat, or deciding whether an email is spam or not spam. It is a form of **supervised learning**, where the model learns from labeled data, meaning each input comes with a known output, and the model learns the mapping between inputs and outputs.

I quickly learned that there are two main types of classification:

- **Binary Classification** – when there are only two classes.
- **Multi-Class Classification** – when there are more than two classes.

## Binary Classification

Binary classification means the model predicts between two outcomes, like:

- Dog or Cat  
- Spam or Not Spam  
- 0 or 1

### Dataset for Binary Classification

I used the **make_circles()** dataset, which creates two concentric circles making a non-linearly separable problem, perfect for learning classification.

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

We use **optimizer.zero_grad()** before each backward pass to **reset gradients** from the previous iteration. Otherwise, they would **accumulate**, leading to incorrect parameter updates.

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
    title: "How I Learned Computer Vision by Building a CNN From Scratch",
    date: "2025-11-17",
    mainCategory: "Machine Learning",
    subCategory: "Computer Vision",
    images: [],
    description: "See how machines learn to “see” the world.",
    content: `

## INTRODUCTION

After learning about classification models, I became really curious about computer vision, how computers can actually "see" and understand images like humans do. Exploring this area has been super exciting, and it's motivating me to dive deeper into neural networks and image recognition.

One of the most fascinating concepts I discovered is the Convolutional Neural Network (CNN). CNNs are a type of deep learning model specifically designed to process image data. They can automatically learn features like edges, textures, and shapes from images, which makes them incredibly powerful for tasks like object detection, image classification, and more.

In this blog, I'll share my journey of building a CNN using PyTorch and torchvision, step by step, while exploring the FashionMNIST dataset. You'll see how I prepare data, design the network, train it, and evaluate its performance, all while learning how CNNs really work.

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

\`
[32, 1, 28, 28]
\`

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
  Max pooling is a pooling operation that picks the **maximum value** from a small region of the feature map (output of the image after convolution). It uses a sliding window (like 2×2) and from each window, it selects the highest value. This creates a smaller feature map that keeps only the **most important or strongest features** from the previous layer. It does **not learn** anything, it simply picks values.

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
     It Converts multi-dimensional feature maps into a **single-dimensional vector** so it can be passed to the fully connected layer. It does not have weights or biases, just reshapes the data.  

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
    print(f"Epoch: {epoch}\\n")
    
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

Working on this project was a great experience that helped me dive deeper into how CNNs and machine learning actually work. It was a meaningful learning journey, understanding everything from datasets to layers, training steps, and evaluation made me even more curious to explore more advanced concepts in the future.

This project also introduced me to the world of **computer vision**, a field of AI that allows machines to understand and interpret images. Computer vision powers many real-life applications such as image classification, face detection, medical imaging, and self-driving cars. Learning the basics of CNNs is an important foundation because these models form the core of most computer vision systems.

Overall, this experience strengthened my understanding and motivated me to continue exploring more powerful models and techniques in deep learning.

`
  },
{
  id: "transformer-from-scratch",
  title: "Building a Transformer Is Easier Than Building a Chatbot",
  date: "2026-03-18",
  mainCategory: "Machine Learning",
  subCategory: "Natural Language Processing",
  images: ["/transformer1.png", "/transformer2.png"],
  description: "What two months of training a Transformer from scratch taught me about building language models.",
  content: `

## Introduction

When I first read *“Attention Is All You Need”*, I thought: “If I understand this architecture and implement it correctly, I should be able to build a good language model.” I was wrong, and I’m glad I was. 

Over the last two months, I trained a Transformer from scratch, moving from very small datasets to a much larger conversational dataset. I implemented embeddings, multi-head attention, feed-forward networks, decoding strategies, schedulers, and evaluation methods myself. What I learned is not just how Transformers work, but why building a fluent chatbot is much harder than the paper makes it look. This blog is not about theory or code; it’s about what actually happens when you try to train a Transformer with limited data, limited compute, and real-world constraints.


## Why I Decided to Train From Scratch

There are thousands of tutorials showing how to fine-tune GPT-2 or load a pretrained model, but I intentionally avoided that at the beginning. I wanted to understand how embeddings actually learn meaning, how token IDs connect directly to model weights, why models repeat themselves, and why loss goes down but outputs still feel wrong. To learn that, I needed to feel the pain of training, not just read about it.


## The Datasets: Scaling Changed Everything

I didn’t start with a big dataset. I grew step by step, and that turned out to be one of the most important learning experiences.

### Dataset 1: Very Small (GitHub – ConvAI)
My first dataset was very small. Conversations were limited, the vocabulary was tiny, and the model quickly overfitted. This stage was useful only to check whether training worked, whether the loss decreased, and whether the model generated anything. The answers were yes, but the outputs were extremely weak.

### Dataset 2: Medium Size (Kaggle – Chatbot Dataset)
Next, I used a larger Kaggle dataset. I split it into 90 percent training and 10 percent testing, and while the vocabulary grew, it was still manageable. Here I noticed better grammar and slightly longer responses, but still poor conversational flow. This was the stage where I realized: “The model is learning language structure, but not conversation.”

### Dataset 3: Large Dataset (Kaggle – DailyDialog)
Finally, I moved to a much larger and cleaner dataset with separate train and validation sets and more natural conversations. This caused a huge jump. Vocabulary size went from around 1,900 tokens to about 25,000 tokens. That single change taught me something critical: tokenizer size is not a small detail. It completely reshapes the model. The embedding matrix, output layer, memory usage, and training stability all changed.

## The Actual Training Setup

For most experiments, I kept the architecture relatively small because I was training on the free Google Colab GPU. My main configuration was:

| Hyperparameter | Value |
|---|---|
| Batch size | 16 |
| Learning rate | 7e-5 |
| Maximum sequence length | 350 |
| Embedding dimension (*d_model*) | 512 |
| Encoder layers | 6 |
| Decoder layers | 6 |
| Attention heads | 12 |
| Feed-forward dimension | 3072 |
| Dropout | 0.1 |
| Target epochs | 50 |

This configuration resulted in approximately **≈158.7 million parameters**. For a personal project trained on free Google Colab GPUs, this felt surprisingly large, but at the same time, it is still tiny compared to modern large language models, which often contain billions of parameters. 

In practice, I never reached the full 50 epochs. Training one epoch often took somewhere between 30 and 50 minutes, depending on the dataset and Colab session. Because free Colab sessions disconnect and compute time is limited, the furthest I managed to train was around 21 epochs. This was my first lesson that machine learning experiments are often constrained less by ideas and more by available compute.


## The Reality of Training on Google Colab (Free GPU)

![Training Setup](/transformer1.png)

I trained everything on Google Colab using the free GPU. This helped a lot compared to CPU, but it came with hard limits. Sessions disconnected after a few hours, and training often stopped in the middle of an epoch. I had to resume later, sometimes the next day. Because of this, I could not train for long continuous periods. I had to carefully save checkpoints, and hyperparameter tuning became slow and frustrating. This made me understand something important: most impressive language models are not hard because of code. They are hard because of time and compute.

But I do not regret it at all. It may not look fruitful from the outside because the model did not perform well, but for me it was extremely valuable. I experienced the tension of training, the uncertainty, the trial and error. I experimented, tuned hyperparameters, failed, and tried again. That hands-on experience mattered more than the final result.


## Architecture Was Not the Hard Part

Implementing embeddings, multi-head attention, feed-forward networks, and residual connections was honestly the easiest part once the theory was clear. What surprised me was this: even with a correct implementation, the model did not become intelligent. It could form sentences and follow grammar patterns, but it could not hold meaningful conversations or respond logically most of the time.

![Model Architecture](/transformer2.png)


## Why Accuracy Failed as an Evaluation Metric

At first, I evaluated my model using token-level accuracy. On paper, the numbers looked fine, but in reality, the outputs did not. Then I realized the problem: language does not have just one correct answer. Accuracy rewards a single outcome and penalizes every other valid one. That realization pushed me toward perplexity instead. Perplexity helped me understand how uncertain the model was, whether it was learning smoother distributions, and whether training was actually improving language modeling. This was more than a metric change. It was a mindset shift.


## Greedy Decoding Almost Ruined My Model

Initially, I used greedy decoding. At every step, the model picked the token with the highest probability. It sounded reasonable, but the results were terrible. The model kept repeating itself, reused the same tokens again and again, and produced boring responses. While digging into this, I learned about better decoding strategies like top-k sampling, top-p sampling, and temperature. 

I switched to top-k sampling with temperature. Instead of always picking the top token, the model selects from the top k tokens and samples one, while temperature controls how confident or random the selection is. This simple change made a huge difference. The model reduced repetition, improved grammar, and produced responses that felt more natural. For reference, the underlying model weights never changed; only the generation strategy changed. That surprised me because the improvement was immediately visible despite no additional training. It was my first realization that model quality and perceived model quality are not always the same thing.


## Tokenizer and Model: You Can’t Separate Them

At first, I thought the tokenizer was just a utility that converts text into token IDs. That assumption was wrong. The tokenizer directly shapes how the model learns, as token IDs are tied to embeddings and the output layer, and the model adjusts its weights based on this representation. Because of this, a model only works properly with the same tokenizer it was trained on. Changing the tokenizer breaks everything the model has learned. 

When the vocabulary expanded from roughly 1.9K tokens to 25K tokens, the embedding matrix and output layer changed completely. The model was not relearning language itself, but it was learning a new tokenization scheme and a new mapping between tokens and embeddings. That distinction sounds small, but in practice, it meant training dynamics changed significantly.

## What "Attention Is All You Need" Actually Solved

One realization I had while doing this project was that the famous paper solved an architectural problem, not the entire language modeling problem. The Transformer architecture made training more efficient and scalable than earlier sequence models. What it did not solve were problems such as:

- data collection  
- compute requirements  
- evaluation  
- alignment  
- decoding  
- instruction following  

Those challenges still exist today.


## Why the Chatbot Still Wasn't Good

This was probably the most frustrating part of the entire project. Even when training loss decreased and perplexity improved, the model still struggled to hold meaningful conversations. Here are a few real examples from the model:

### Example 1
\`\`\`python
Input: "Excuse me . I bought the CD here two days ago . It's scratched , and doesn't play properly ."
Expected: "I'm sorry about that , sir . I'll get you another one ."
Predicted: "I won't b e lie v e it ."
\`\`\`

### Example 2
\`\`\`python
Input: "There's no limit to how often you can use your bus pass ."
Expected: "Really ?"
Predicted: "Than k s , but I ca n I ' t thin k s o . I ' ll st b e lie v e y ou ca n d o w e ca n b e e a n d o n h er ."
\`\`\`

### Example 3
\`\`\`python
Input: "Yes , we are on the same plane ."
Expected: "But I am a transfer passenger . I have a connecting flight to Miami ."
Predicted: "Th at s ou n g o o o n e ."
\`\`\`

Looking back, there were several likely reasons for this struggle. 

**1. The Model Was Simply Too Small**: Compared to modern language models, my Transformer was tiny. It could learn grammar patterns and common responses, but it did not have enough capacity to absorb the diversity of human conversation.

**2. Limited Training Data**: Although the final dataset was much larger than where I started, it was still tiny compared to the datasets used to train modern language models. Large language models are exposed to billions of tokens, and my model was nowhere near that scale.

**3. Limited Training Time**: The model may also have been undertrained. I planned for 50 epochs but stopped around 21.

**4. Exposure Bias**: During training, the model always sees the correct previous token, but during generation, it must rely on its own predictions. A small mistake early in a response can compound into a completely different sentence later. I saw this happen constantly: the first few words would look reasonable, and then the response would drift into nonsense.

**5. No Instruction Tuning**: One thing I did not appreciate at the beginning was how important instruction tuning is. A language model can learn language patterns without learning how to behave as a helpful assistant. Training on conversations alone does not automatically produce ChatGPT-like behavior. That additional alignment stage is a major part of why modern assistants feel coherent. This was the moment I realized that building a language model and building a useful chatbot are not the same problem.


## What This Journey Changed for Me

Before this project, I thought: “If I understand CNNs and Transformers, I understand deep learning.” Now I see how incomplete that mindset was. What I’ve learned instead is simple: the more you learn, the more you realize how much you don’t know. Training a Transformer did not help me build a perfect chatbot, but it gave me real understanding, and that is far more valuable.


## Resources

- Transformer theory notes: [Google Doc](https://docs.google.com/document/d/1ikOdLAeJLqGN6gtCLiAz2Z0_SuL_oY2sne6fMKnRVxQ/edit?usp=sharing) 
- Training code: [GitHub repo](https://github.com/WarishAli1/transformer_building) 
- Experiments and checkpoints: soon... 


## Final Thought

I started this project thinking that learning Transformers would be similar to learning CNNs. Since attention is the core idea behind modern language models, I believed it would be a straightforward next step. I was wrong. Understanding the theory was only the beginning; the real challenge started when I tried to build and evaluate my own model.

I faced many problems during this journey, but they did not discourage me. They made me more curious. This project was not about building something perfect. It was about understanding why building something like ChatGPT is so difficult, and that alone made the journey worth it.

`
},
{
  id: "docker-in-sykra",
  title: "Containerizing Sykra with Docker Compose: Design Decisions and Pitfalls",
  date: "2026-10-11",
  mainCategory: "DevOps",
  subCategory: "Docker",
  images: ["/docker-architecture.svg"],
  description: "From juggling terminals by hand to one command: how Docker changed the way I run Sykra, and what six containers taught me about data, startup order, and security.",
  content: `

## Introduction

Before Docker, starting my project meant opening one terminal for the backend, another for the frontend, and making sure Neo4j was running too. It wasn't hard, just a few commands each time, but it was several separate things to start, in the right order, every single time. Once I noticed how much of that lived only in my head, I wanted it written down somewhere a machine could run it.

The project is **Sykra Research**, an agent-based system that helps with research. Its Docker Compose setup started with three services: Neo4j, the FastAPI backend, and the Next.js frontend. It has since grown to six, as I added PostgreSQL for durable relational data, ClamAV for optional malware scanning, and Redis for distributed rate limiting. That growth is a big part of why containerizing early paid off.

## Why I Picked It Up

The first reason was that I wanted to learn Docker. I had read about it for a long time and never used it in something real, and I knew reading alone wouldn't teach me much. So I containerized my own project.

The second reason was the future. Right now I'm the only developer on Sykra. But if I ever bring someone in, or try to deploy it, I don't want their first day to be "install these five things and hope your versions match mine." Starting early, while the project was small, was easier than retrofitting it later.

## What It Looks Like Now

![How Sykra's services and volumes fit together in Docker Compose](/docker-architecture.svg)

One \`docker-compose.yml\` describes the whole system: the six services, their dependencies, and where their data lives. Once Docker is running and the required variables are set in \`.env\`, one command brings it all up.

\`\`\`yaml
services:
  postgres:   # users, sessions, chats, library records
    image: postgres:16-alpine
    volumes: [postgres_data:/var/lib/postgresql/data]

  neo4j:      # knowledge graph
    image: neo4j:5
    volumes: [neo4j_data:/data, neo4j_logs:/logs]

  redis:      # rate limiting, internal only
    image: redis:7-alpine
    expose: ["6379"]

  clamav:     # scans uploaded files, internal only
    image: clamav/clamav:stable
    expose: ["3310"]
    volumes: [clamav_data:/var/lib/clamav]

  backend:
    build: ./backend
    depends_on:
      postgres: { condition: service_healthy }
      neo4j:    { condition: service_healthy }
    volumes:
      - ./backend/uploads:/app/uploads
      - ./backend/exports:/app/exports
      - chroma_data:/app/app/db/vector_db
      - hf_cache:/app/huggingface_cache

  frontend:
    build: ./frontend
    depends_on:
      backend: { condition: service_healthy }
\`\`\`

*(Trimmed for readability. Ports, env vars, and healthchecks are mostly left out here.)*

## Why Six Containers

It looks like a lot for one project, but each piece has a different job.

- **Neo4j** stores relationships: how papers, concepts, and entities connect. A graph is the natural shape for that.
- **PostgreSQL** stores the durable relational data: users, authentication sessions, chats, messages, research sessions, uploaded-file metadata, and library records. This is the data the app can't afford to lose, and relational tables and transactions are the right tool for it.
- **Chroma** stores vector embeddings for semantic search. It isn't its own container: it runs embedded inside the backend, with its data kept on a volume.
- **Redis** keeps short-lived rate-limit counters for the authentication and upload endpoints, shared across backend instances. In development Sykra can fall back to an in-memory limiter, but production requires Redis. It is only reachable from other containers.
- **ClamAV** is the malware scanner I wired into the upload flow. A research tool that accepts user uploads should not trust them, so this is the part I'm most glad I added. It sits behind a \`CLAMAV_ENABLED\` flag, so I can switch it off in development, where it is slow to start and heavy on memory.

Docker made it cheap to try each of these stores. Running three different databases natively on my laptop would have put me off; in Compose, each one is a few lines. That lowers the cost of setting them up, though not the work of operating them well.

## Volumes and Bind Mounts

This was my first real "aha." Containers are disposable. If you delete one, everything inside it disappears with it. That's fine for code, but not for a graph database or a vector store full of embeddings.

**Named volumes** are storage Docker manages outside the container, so data survives when the container is destroyed and rebuilt. I use them for Postgres, Neo4j's data and logs, ClamAV's virus definitions, the Chroma vector database, and the Hugging Face model cache, so models aren't re-downloaded on every rebuild.

**Bind mounts** are different: they map a folder from my machine into the container. I use them for \`uploads\` and \`exports\`, because I want to open those files directly from my own disk. Named volumes are for data Docker should own; bind mounts are for files I want to see and touch.

## Startup Order

The backend can't work without Postgres and Neo4j, and the frontend needs the backend. Listing them in the compose file doesn't guarantee they're *ready* in that order, only that they've *started*. For those three dependencies I added healthchecks and \`condition: service_healthy\`, so the backend waits for Postgres and Neo4j to pass their checks, and the frontend waits for the backend. That took me from "it sometimes works" to a startup that behaves the same way almost every time. A healthcheck only tells Compose the service passed its test at startup, though; it isn't a guarantee the service never fails later.

## Ports, Secrets and What Not to Expose

Compose has two ways to open a port, and the difference matters. \`ports\` publishes a container port to my host machine. \`expose\` only makes it reachable by other containers on the Compose network.

The backend, frontend, Neo4j, and Postgres publish ports because I need to reach them while developing. Redis and ClamAV only use \`expose\`, because nothing outside the stack has any reason to talk to them. Publishing fewer ports means a smaller attack surface, and that is a habit worth building before deploying anything.

Secrets follow a similar idea. The Postgres password is written as \`\${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD in .env}\`, so Compose refuses to start if it's missing, instead of quietly running with a blank password. It annoyed me at first (see below) and now I prefer it.

## Multi-Stage Builds

My frontend Dockerfile has separate stages for installing dependencies, building, and running. The final image only carries what's needed to run the app, not the whole build toolchain. A single-stage build of the same app comes out to roughly 1.8 GB, while the multi-stage version is about 294 MB. It's a small thing, but it changed how I think about what should and shouldn't ship inside an image.

## Where It Got Messy

Most of my problems weren't dramatic. They came from having to unlearn how I used to run software.

**Starting too early.** My first attempt to build and run the stack failed because the Docker daemon wasn't running. I had been treating \`docker\` like an ordinary command-line tool, when it's a client talking to a background service that has to be started first.

**A missing variable that blocked everything.** Compose warned that \`POSTGRES_PASSWORD\` wasn't set and was defaulting to a blank string, then failed with an error saying the required variable had no value. What surprised me was that I couldn't even bring the stack down. Compose resolves the whole file before running any command, so one missing required value blocks \`up\`, \`down\`, everything. I fixed it by adding the value to the \`.env\` file next to \`docker-compose.yml\`, which is where Compose looks for variable substitution. Now when something behaves oddly, my first question is "where is this value actually read?"

**Debugging code that wasn't running.** I was editing the landing page, kept refreshing, and saw nothing change. For a moment I assumed my code was wrong, until I realized I wasn't running a local dev server anymore. In my setup the frontend code is baked into the image, so my edits didn't show up until I rebuilt and recreated the container. (A bind mount plus a dev server with hot reload would avoid that, but I haven't set that up.) Now I rebuild after changes, and when something looks wrong I check which image is running and read the logs before suspecting my own code.

**Running out of disk.** While building images and running the stack, my Mac ran out of storage, which had never happened to me before. Images, build layers, and volumes take real space, and I had never looked at it. When I rebuilt after a month away, the build took well over half an hour, with the base images, system packages, Python dependencies, and npm packages all downloading again. I didn't dig into exactly why the cache was gone. Either way, containers have a cost I had been ignoring, and \`docker system df\` is now part of how I check on a project.

## What I've Learned

The biggest shift wasn't a command. It was a change in how I think: my environment is now something I describe instead of something I set up. If my laptop broke tomorrow, I could clone the repo and have the whole system running again without remembering what I had installed.

I also got more careful about decisions I used to ignore: where data lives, what an image really needs, which ports are exposed to the outside, and what happens when a service starts before its dependency is ready.

## What I Haven't Done Yet

I've used Docker on a single machine in development. I haven't deployed these containers to production, set up CI/CD around them, or worked with orchestration tools like Kubernetes. Several choices here, like \`SECURE_COOKIES: "false"\` and published database ports, are development settings that would need to change first. Those are next, and containerizing Sykra early was partly to make that step easier.

## Conclusion

Learning Docker on a real project taught me things a tutorial wouldn't have: which data has to survive, why startup order matters, and why some ports should never leave the network. It made Sykra easier to run today, and it will make it easier to share, deploy, or hand to someone else later.

`
}
];
export default blogs;