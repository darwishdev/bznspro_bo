link:
	npm link v-dashkit

unlink:
	npm unlink v-dashkit
update:
	rm -rf node_modules && npm install

clean:
	npm cache clean -f && make update link


run:
	npm run dev
	

increase_watchers:
	sudo sysctl fs.inotify.max_user_watches=524288 && sudo sysctl -p  