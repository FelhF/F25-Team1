# Software Requirements Specification
## For <project name>

Version 0.1  
Prepared by Franklin Lagos & Papa Dieng  
CSC 340
September 17, 2025

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
  * 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * 1.4 [References](#14-references)
  * 1.5 [Document Overview](#15-document-overview)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Functions](#21-product-functions)
  * 2.2 [Product Constraints](#22-product-constraints)
  * 2.3 [User Characteristics](#23-user-characteristics)
  * 2.4 [Assumptions and Dependencies](#24-assumptions-and-dependencies)
* 3 [Requirements](#3-requirements)
  * 3.1 [Functional Requirements](#31-functional-requirements)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Non-Functional Requirements](#32-non-functional-requirements)
    * 3.2.1 [Performance](#321-performance)
    * 3.2.2 [Security](#322-security)
    * 3.2.3 [Reliability](#323-reliability)
    * 3.2.4 [Availability](#324-availability)
    * 3.2.5 [Compliance](#325-compliance)
    * 3.2.6 [Cost](#326-cost)
    * 3.2.7 [Deadline](#327-deadline)

## Revision History
| Name | Date    | Reason For Changes  | Version   |
| ---- | ------- | ------------------- | --------- |
| Franklin L.    | Sept 17        |   Initial changes                  |   1.0        |
|      |         |                     |           |
|      |         |                     |           |

## 1. Introduction

### 1.1 Document Purpose
Describe the purpose of the SRS and its intended audience.
**change**

### 1.2 Product Scope
Identify the product whose software requirements are specified in this document, including the revision or release number. Explain what the product that is covered by this SRS will do, particularly if this SRS describes only part of the system or a single subsystem. 
Provide a short description of the software being specified and its purpose, including relevant benefits, objectives, and goals. Relate the software to corporate goals or business strategies. If a separate vision and scope document is available, refer to it rather than duplicating its contents here.

**change**

### 1.3 Definitions, Acronyms and Abbreviations                                                                                                                                                                          |

### 1.4 References
List any other documents or Web addresses to which this SRS refers. These may include user interface style guides, contracts, standards, system requirements specifications, use case documents, or a vision and scope document. Provide enough information so that the reader could access a copy of each reference, including title, author, version number, date, and source or location. **change**

### 1.5 Document Overview
Describe what the rest of the document contains and how it is organized. **change**

## 2. Product Overview
Deal Finder is a website created for the purpose of compiling 
deals, sales, and discounts from a multitude of retail, online, 
and local sellers in a single place. It is a community-driven effort in which the users themselves create bulletin boards
where they can post deals about their chosen topic. 

### 2.1 Product Functions
Customers can log in and either check a variety of trending deals or they can search for deals of certain categories or within a chosen
radius from their chosen location. Customers can also become bulletin board creators and be the ones that gather deals to share with others.


### 2.2 Product Constraints

The user interface is meant mainly for computer webpage viewing. If opened on other devices, the user interface may not look as intended. Since it is a community-driven website, the quality may fluctuate depending on the users and bulletin board creators.
  
### 2.3 User Characteristics
The user interface will be streamlined so users with minimal knowledge on computers should stll be able to use Deal Finder.

### 2.4 Assumptions and Dependencies
Deal Finder uses HTML and CSS for the user interface and their front end features. The backend will operate using a database on PostgresSQL (subject to change) and will use external API's for location and/or finding additional deals.

## 3. Requirements

### 3.1 Functional Requirements 


* While an account is not necessary to view deals, It is necessary to create bulletin board, set deal preferences and bookmarks, give reviews, and a few other features. An account id is given to each created account.
* The browser may need to be up to date to guarantee optimal user experience.

**change** **add user function requirements**
* Bulletin board information can be changed. i.e. name, description, picture.
* Bulletin boards can be changed by the bulletin board creator to add, update, remove, or set a deadline for each of their shared deals.
* Bulletin board creators can read, respond, and mark reviews for moderation. 
* Bulletin board creators can read recommended deals from users to consider adding to their bulletin board.
* Bulletin board creators can see statistics about interactions and liked deals from the users.

#### 3.1.1 User interfaces
Web pages will use HTML, CSS, and JavaScript.

#### 3.1.2 Hardware interfaces
Devices with web browser capabilities. For optimal ser experience, a laptop or a desktop pc are recommended.

#### 3.1.3 Software interfaces
Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint. **change**

### 3.2 Non Functional Requirements 

#### 3.2.1 Performance

Deal Finder will consume low amount of memory.

#### 3.2.2 Security
Users can only change information about their account or bulletin boards either created or given access or given creator access by other. A user who is not a creator of a bulletin board can not change anyhing about the board, besides giving reviews or bookmarking to their list of preferred bulletin boards.

#### 3.2.3 Reliability

While older web browsers may work, for best performance and reliability, use an up-to-date browser.

#### 3.2.4 Availability
Deal Finder should be available to a pre-release state around
October 2025, final working version should be up around December 2025.

#### 3.2.5 Compliance

**change**

#### 3.2.6 Cost
Specify monetary cost of the software product. **change**

#### 3.2.7 Deadline
Specify schedule for delivery of the software product. **change**
