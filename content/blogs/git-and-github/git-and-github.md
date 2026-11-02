---
title: "Git & Github"
date: "2026-10-18"
category: "Tools & Workflow"
thumbnail: "./github-thumbnail.png"
description: "Mastering version control and collaborative workflows for modern data analysts."
---

# Git

## What is Git?

Git is a version control system (VCS). It tracks changes in a set of files over time, allowing you to revert to previous versions if needed. Imagine it as a time machine for your code.

## How Git works?

Git creates a local repository on your computer. This repository stores snapshots of your files at different points in time, called commits. Each commit includes the changes made, the author, and a message describing the changes. You can also create branches to work on different features of your code without affecting the main codebase.

## Benefits of Git:

- **Tracks history:** See how your code evolved over time and revert to previous versions if necessary.
- **Collaboration:** Enables multiple developers to work on the same codebase simultaneously.
- **Offline work:** Make changes to your code even without an internet connection.

## Limitations of Git:

- **Command line:** Primarily uses commands, which can be intimidating for beginners.
- **Local storage:** The local repository resides on your machine, requiring backups to prevent data loss.

# GitHub

## What is GitHub?

GitHub is a web-based platform that utilizes Git for version control. It provides a user-friendly interface for managing your Git repositories and collaborating with others.

## How GitHub works?

Think of GitHub as a storage facility for your Git repositories. You can push your local repository to GitHub to create a remote copy. This allows you to access your code from anywhere and collaborate with others. GitHub also offers features like issue tracking, pull requests, and code review, which streamline the development process.

## Benefits of GitHub:

- **Cloud storage:** Securely stores your codebase in the cloud, accessible from any device.
- **Collaboration:** Enables developers to work together on projects, track issues, and review code.
- **Version control:** Provides all the functionalities of Git for version control.
- **Open source:** GitHub fosters open-source development, allowing public projects to be shared and contributed to by the community.

## Limitations of GitHub:

- **Pricing:** While GitHub offers free plans with basic features, some functionalities require paid subscriptions for private repositories or additional storage.

## Difference between git and GitHub

| Feature | GIT | GitHub |
|---------|-----|--------|
| Type | Version control system (VCS) | Web-based Git hosting service |
| Functionality | Tracks changes, versioning, reverting | Stores & manages Git repositories, collaboration |
| Interface | Command-line | Graphical User Interface (GUI) or command-line|
| Location | Installed locally | Cloud-based |
| Collaboration | Limited, suitable for small teams | Built-in features for teams & open-source projects|
| Pricing | Free and open-source | Free tier with paid plans for additional features |

## Key Git Commands

```bash
git status
git add .
git commit -m "feat: add customer retention cohort analysis"
git push origin main
```

## Commonly Used Git Commands

### Initializing and Setting Up

```
git init: Creates a new Git repository in your current directory.
```
### Tracking Changes

```
git status: Shows the current status of your working directory and staging area.

git add <file>: Adds a specific file to the staging area, which tells Git to include those changes in the next commit.

git add -A: Adds all new and modified files to the staging area.
```
### Committing Changes

```
git commit -m "<message>": Creates a snapshot of the changes in the staging area, along with a commit message describing the changes.
```

### Branching and Merging

```
git branch <branch_name>: Creates a new branch.

git checkout <branch_name>: Switches to a different branch.

git merge <branch_name>: Merges changes from another branch into the current branch.
```

### Remote Repositories (assuming GitHub is your remote)

```
git remote add origin <url>: Adds a remote repository (e.g., your GitHub repository) to your local repository.

git pull origin <branch_name>: Downloads changes from the remote repository's specified branch and merges them into your local branch.

git push origin <branch_name>: Uploads your local commits to the remote repository's specified branch.
```

### Additional Useful Commands

```
git log: Shows the history of commits in your repository.

git diff: Shows the difference between your working directory and the staging area, or between different commits.

git clone <url>: Creates a local copy of a remote repository.
```

## Summary
By keeping your exploratory queries, dashboards, and notebooks under Git version control, you ensure transparency and reliability in every insight you deliver.

