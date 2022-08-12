<template>
  <div>
    <h1>Todo Form</h1>

    <form @submit.prevent="addItemAndClear(todo)">
      <input v-model="todo" type="text" /><button>Add</button>
    </form>
    <div class="col-lg-12" style="margin: 25px;">
      <table class="table table-bordered table-striped table-hover">
        <tbody>
          <tr style="margin-bottom: 10px;" v-for="(todo, index) in todos" :key="index">
            <td>{{ todo.name }}</td>
            <td>
              <input type="button" class="btn btn-success btn-xs" value="Completed" />
              <input type="button" class="btn btn-primary btn-xs" @click="updateTodo(todo.id)" value="Update" />
              <input type="button" class="btn btn-danger btn-xs" @click="deleteTodo(todo.id)" value="Delete" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { useTodoListStore } from "@/store/useTodoListStore";

import { reactive, ref, onMounted } from "vue";
export default {
  setup() {
    const todo = ref("");
    const todos = reactive([])

    onMounted(() => {
        axios.get('https://todolist-f7b8a-default-rtdb.firebaseio.com/todos.json')
            .then(res => {
                const data = res.data

                for(let key in data) {
                    const basictodo = data[key]
                    basictodo.id = key

                    todos.push(basictodo)
                }
            })
            .catch(err => console.log(err))
    })

    // use Pinia store:
    const store = useTodoListStore();

    function addItemAndClear(item) {
      if (item.length === 0) {
        return;
      }
      // invokes function in the store:
      store.addTodo(item);

      const itemObject = reactive({});
      itemObject.name = item;

      axios
        .post(
          "https://todolist-f7b8a-default-rtdb.firebaseio.com/todos.json",
          itemObject
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err));

      todo.value = "";
    }

    function deleteTodo(itemID) {
      axios.delete(`https://todolist-f7b8a-default-rtdb.firebaseio.com/todos/${itemID}.json`)
        .then(response => console.log(response))
        .catch(error => alert(error));
    }

    function updateTodo(itemID) {
      axios.put(`https://todolist-f7b8a-default-rtdb.firebaseio.com/todos/${itemID}.json`,{"name":"Todo List Changed"})
        .then(response => console.log(response))
        .catch(error => alert(error));
    }

    return { todo, addItemAndClear, updateTodo, deleteTodo, todos };
  },
};
</script>