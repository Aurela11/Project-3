const { User } = require('@prisma/client');
const express = require('express');

express.Request.prototype.user = User;
