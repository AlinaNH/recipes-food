module.exports = {
  'apps': [{
    script: 'src/main.ts',
    watch: 'src/main.ts',
    interpreter: 'ts-node',
    instances: 0,
    exec_mode: 'cluster',
    env: {
      COMMON_VARIABLE: 'true'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    script: 'front/index.tsx',
    watch: ['front/index.tsx'],
    interpreter: 'ts-node',
    instances: 0,
    exec_mode: 'cluster'
  }],

  'deploy': {
    production: {
      'key': 'key',
      'user': 'root',
      'host': '165.227.158.125',
      'ref': 'origin/master',
      'repo': 'https://github.com/AlinaNH/recipes-food.git',
      'path': '/var/www/recipes-food',
      'pre-deploy-local': '',
      'pre-deploy': 'git reset --hard',
      'post-deploy': 'pm2 startOrRestart ecosystem.json --env production',
      'pre-setup': '',
      'postinstall': '$(yarn bin)/pm2 install typescript',
      'ssh_options': [
        'StrictHostKeyChecking=no',
        'PasswordAuthentication=no'
      ],
      'env': {
        'NODE_ENV': 'staging'
      }
    }
  },
  'staging': {
    'user': 'root',
    'host': '165.227.158.125',
    'ref': 'origin/master',
    'repo': 'https://github.com/AlinaNH/recipes-food.git',
    'ssh_options': ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
    'path': '/var/www/recipes-food',
    'post-deploy': 'pm2 startOrRestart ecosystem.json --env dev',
    'env': {
      'NODE_ENV': 'staging'
    }
  }
};
