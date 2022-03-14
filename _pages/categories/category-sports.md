---
title: "sports"
layout: archive
permalink: categories/sports
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.sports %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
