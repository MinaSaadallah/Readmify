/**
 * Readmify - Open Source Legal License Catalog & Agreement Generator
 * Definitions, permission matrices, and authentic standard legal texts
 */

export const LICENSE_CATALOG = [
  {
    id: 'MIT',
    name: 'MIT License',
    spdxId: 'MIT',
    shortDesc: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices.',
    badgeColor: 'yellow',
    badgeUrl: 'https://img.shields.io/badge/License-MIT-yellow.svg',
    url: 'https://opensource.org/licenses/MIT',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `MIT License

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  },
  {
    id: 'Apache-2.0',
    name: 'Apache License 2.0',
    spdxId: 'Apache-2.0',
    shortDesc: 'A permissive license whose main conditions require preservation of copyright and license notices, and explicit grant of patent rights.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
    url: 'https://opensource.org/licenses/Apache-2.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Trademark use', 'Liability', 'Warranty'],
    conditions: ['License and copyright notice', 'State changes'],
    generateText: (year, holder, projectName) => `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   Copyright ${year || new Date().getFullYear()} ${holder || 'The Authors'}

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`
  },
  {
    id: 'GPL-3.0',
    name: 'GNU General Public License v3.0',
    spdxId: 'GPL-3.0',
    shortDesc: 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
    url: 'https://www.gnu.org/licenses/gpl-3.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['Disclose source', 'License and copyright notice', 'Same license', 'State changes'],
    generateText: (year, holder, projectName) => `${projectName || 'This program'} - A free and open-source project
Copyright (C) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
  },
  {
    id: 'AGPL-3.0',
    name: 'GNU Affero General Public License v3.0',
    spdxId: 'AGPL-3.0',
    shortDesc: 'Strongest copyleft license. Network users interacting with the software remotely via web/API are entitled to receive the full source code.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-AGPL_v3-blue.svg',
    url: 'https://www.gnu.org/licenses/agpl-3.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['Disclose source', 'Network use is distribution', 'License and copyright notice', 'Same license', 'State changes'],
    generateText: (year, holder, projectName) => `${projectName || 'This program'} - An open-source application
Copyright (C) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
  },
  {
    id: 'BSD-3-Clause',
    name: 'BSD 3-Clause License',
    spdxId: 'BSD-3-Clause',
    shortDesc: 'A permissive license similar to BSD 2-Clause, with a clause forbidding others from using copyright holders names for promotional endorsement without permission.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg',
    url: 'https://opensource.org/licenses/BSD-3-Clause',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `BSD 3-Clause License

Copyright (c) ${year || new Date().getFullYear()}, ${holder || 'The Authors'}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
  },
  {
    id: 'BSD-2-Clause',
    name: 'BSD 2-Clause License',
    spdxId: 'BSD-2-Clause',
    shortDesc: 'A permissive license that comes in two clauses. Extremely lightweight and simple.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-BSD_2--Clause-orange.svg',
    url: 'https://opensource.org/licenses/BSD-2-Clause',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `BSD 2-Clause License

Copyright (c) ${year || new Date().getFullYear()}, ${holder || 'The Authors'}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
  },
  {
    id: 'MPL-2.0',
    name: 'Mozilla Public License 2.0',
    spdxId: 'MPL-2.0',
    shortDesc: 'A weak copyleft license that is file-level rather than project-level, allowing proprietary extensions as long as modified MPL files remain open source.',
    badgeColor: 'brightgreen',
    badgeUrl: 'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
    url: 'https://opensource.org/licenses/MPL-2.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Trademark use', 'Liability', 'Warranty'],
    conditions: ['Disclose source (file-level)', 'License and copyright notice', 'Same license (file-level)'],
    generateText: (year, holder, projectName) => `This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}`
  },
  {
    id: 'ISC',
    name: 'ISC License',
    spdxId: 'ISC',
    shortDesc: 'A permissive license functionally equivalent to the 2-Clause BSD and MIT licenses, with language that was considered simpler.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-ISC-blue.svg',
    url: 'https://opensource.org/licenses/ISC',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `ISC License

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`
  },
  {
    id: 'Unlicense',
    name: 'The Unlicense',
    spdxId: 'Unlicense',
    shortDesc: 'A license with no conditions whatsoever which dedicates works to the public domain. Equivalent to CC0.',
    badgeColor: 'lightgrey',
    badgeUrl: 'https://img.shields.io/badge/license-Unlicense-blue.svg',
    url: 'https://unlicense.org/',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: [],
    generateText: () => `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>`
  }
];

export function getLicenseById(id) {
  if (!id) return LICENSE_CATALOG[0];
  const norm = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return LICENSE_CATALOG.find(l => {
    const lNorm = l.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const spdxNorm = l.spdxId.toLowerCase().replace(/[^a-z0-9]/g, '');
    return lNorm === norm || spdxNorm === norm;
  }) || LICENSE_CATALOG[0];
}
