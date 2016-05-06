/*
 * Copyright (c) 2016 by API Outsourcing, Inc.
 * This software is the confidential and proprietary information of API
 * Outsourcing, Inc. ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with API Outsourcing, Inc.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
