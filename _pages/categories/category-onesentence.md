---
title: "μΌμ ν μ€"
layout: archive
permalink: categories/onesentence
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.onesentence %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
