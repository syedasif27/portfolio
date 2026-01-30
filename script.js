const output = document.getElementById("output");
const input = document.getElementById("command");

const commands = {
  help: () => `
Available commands:
- about
- skills
- projects
- contact
- clear
`,
  about: () => `
Syed Asif
Linux System Engineer | DevOps | Infrastructure

Focused on high availability, monitoring,
security hardening, and Linux internals.
`,
  skills: () => `
Linux, RHEL, Rocky, Ubuntu
Docker, Proxmox, HAProxy
Prometheus, Grafana, Loki
IPsec, GRE, iptables
OpenLDAP, Postfix, Dovecot
MariaDB, Redis, Nextcloud
`,
  projects: () => `
1. HA iRedMail Infrastructure
   - LDAP replication
   - HAProxy load balancing
   - GlusterFS shared storage

2. Centralized Monitoring Stack
   - Prometheus & Grafana
   - Loki & Promtail

3. Nextcloud High Availability
   - Galera cluster
   - Redis caching

4. IPsec + GRE Lab
   - StrongSwan
   - Secure routing
`,
  contact: () => `
LinkedIn: https://www.linkedin.com/in/syedasif27
GitHub:   https://github.com/syedasif27
Email:    calltoasif27@gmail.com
`,
};

function print(text) {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}

print("Welcome to Syed Asif's terminal portfolio");
print("Type 'help' to see available commands\n");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    print(`syed@infra:~$ ${cmd}`);

    if (cmd === "clear") {
      output.textContent = "";
    } else if (commands[cmd]) {
      print(commands[cmd]());
    } else if (cmd !== "") {
      print(`Command not found: ${cmd}`);
    }

    input.value = "";
  }
});
