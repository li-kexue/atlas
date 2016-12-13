/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(['require',
    'utils/Globals',
    'collection/BaseCollection',
    'models/VSearch',
    'utils/UrlLinks'
], function(require, Globals, BaseCollection, VSearch, UrlLinks) {
    'use strict';
    var VSearchList = BaseCollection.extend(
        //Prototypal attributes
        {
            url: UrlLinks.searchApiUrl(),

            model: VSearch,

            initialize: function() {
                this.modelName = 'VSearch';
                this.modelAttrName = 'results';
                this.bindErrorEvents();
            },
            parseRecords: function(resp, options) {
                this.responseData = {
                    dataType: resp.dataType,
                    query: resp.query,
                    queryType: resp.queryType,
                    requestId: resp.requestId
                };
                try {
                    if (!this.modelAttrName) {
                        throw new Error("this.modelAttrName not defined for " + this);
                    }
                    var list = _.reject(resp[this.modelAttrName], _.isNull);
                    _.each(list, function(obj) {
                        if (!obj.id) {
                            if (obj['$id$'] && obj['$id$'].id) {
                                obj.id = obj['$id$'].id
                            }
                        }
                    })
                    return list;
                } catch (e) {
                    console.log(e);
                }
            },
        },
        //Static Class Members
        {
            /**
             * Table Cols to be passed to Backgrid
             * UI has to use this as base and extend this.
             *
             */
            tableCols: {}
        }
    );
    return VSearchList;
});
