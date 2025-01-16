module.exports = {
    "apps": [{
      "name": "bbb-data-fetcher",
      "script": "./backend/bbb-data-fetcher.py",
      "args": [],
      "instances": "1",
      "wait_ready": true,
      "autorestart": false,
      "max_restarts": 5,
      "interpreter": "./venv/bin/python",
    }]
  }