# Software Requirements Specification
## For <project name>

Version 1.0
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
The purpose of the SRS is to define the requirements for the Deal Finder web application. It serves as a guide for developers, stakeholders, and evaluators to understand the system’s functionality, constraints, and objectives.

### 1.2 Product Scope
Deal Finder is a web platform designed to help users discover discounts, promotions, and deals from online, retail, and local sellers. The system centralizes deal information, enabling users to browse trending offers, search within categories, or filter results by location. Users may create bulletin boards to curate and share deals, making the system community-driven. Benefits include saving users money, creating a trusted source of curated deals, and fostering collaboration among deal-hunters.

### 1.3 Definitions, Acronyms and Abbreviations
UI: User Interface
DB: Database
API: Application Programming Interface
SQL: Structured Query Language
PostgreSQL: Relational Database Management System                                                                                                                                                                          |

### 1.4 References
IEEE Recommended Practice for Software Requirements Specifications (IEEE Std 830-1998).
PostgreSQL Documentation: https://www.postgresql.org/docs/
HTML Standard: https://html.spec.whatwg.org/
CSS Specifications: https://www.w3.org/Style/CSS/
JavaScript Documentation (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript

### 1.5 Document Overview
This document describes the Deal Finder project in detail. Section 2 introduces the product, its main functions, and constraints. Section 3 specifies requirements, including functional and non-functional aspects. The revision history section tracks changes to this document over time.

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

Users can register, log in, and manage accounts.
Users can search deals by category, price, location, or popularity.
Users can bookmark favorite deals.
Users can post reviews and edit or delete their own reviews.
Users can subscribe to bulletin boards.
System sends notifications for new or expiring deals (if enabled).

Admin users can moderate bulletin boards, remove inappropriate content, and manage reports.
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
Database: PostgreSQL for account, deal, and bulletin board storage.

Web Browsers: Chrome, Firefox, Safari, and Edge (latest versions recommended).

APIs:

Geolocation API for location-based deal searches.

Retail APIs (potential, subject to change) for automated deal collection.
Data exchange will use HTTPS with JSON format.

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

The software will follow standard web development practices, including accessibility guidelines (WCAG 2.1) and security best practices (OWASP Top 10). If handling user data, it will comply with relevant privacy regulations (e.g., GDPR, CCPA).

#### 3.2.6 Cost
The project will primarily use free, open-source tools and frameworks. Costs may arise from premium API's, or hosting services.

#### 3.2.7 Deadline
Prototype release: October 2025
Final release: December 2025
